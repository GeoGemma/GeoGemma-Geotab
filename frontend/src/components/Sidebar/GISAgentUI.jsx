import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Loader, Send, MapPin, RotateCcw, AlertTriangle, RefreshCw } from 'lucide-react';
import '../../styles/gisagent.css';

const GISAgentUI = ({ showNotification }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [serverVerified, setServerVerified] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectIntervalRef = useRef(null);
  const welcomeShownRef = useRef(false);
  const timeoutRef = useRef(null);
  const heartbeatIntervalRef = useRef(null);
  const lastMessageTimeRef = useRef(Date.now());
  const requestTimeoutMs = 20000; // 20 seconds timeout
  
  // Prevent recreation of a new connection during component re-renders
  const isConnectingRef = useRef(false);

  // Add stable connection tracking
  const stableConnectionTimerRef = useRef(null);
  const connectionStableRef = useRef(false);
  const forceReconnectRef = useRef(false);
  const connectionStartTimeRef = useRef(0);
  const lastReconnectAttemptRef = useRef(0);
  const MIN_RECONNECT_INTERVAL = 180000; // Increase to 3 minutes (180,000ms) to prevent connection thrashing
  const CONNECTION_THRASHING_THRESHOLD = 3; // Number of rapid disconnects before forcing a longer delay
  const lastDisconnectTimesRef = useRef([]); // Track recent disconnects to detect thrashing

  // Connect to WebSocket server on component mount
  useEffect(() => {
    console.log('GISAgentUI mounted');
    
    // Check if messages were already loaded from localStorage
    const savedMessages = localStorage.getItem('gisAgentMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
          welcomeShownRef.current = true; // Set welcome flag if we have messages
        }
      } catch (e) {
        console.error('Error parsing saved messages:', e);
      }
    }

    // Explicitly check for existence of welcome message in the saved messages
    // to prevent duplicate welcome messages when reconnecting
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages)) {
          // Check if any message looks like a welcome message
          const hasWelcomeMessage = parsedMessages.some(msg => 
            msg.sender === 'assistant' && 
            (msg.text.includes('Welcome') || 
             msg.text.includes('I am here and ready to assist') ||
             msg.text.includes('how I can help you'))
          );
          
          if (hasWelcomeMessage) {
            console.log('Found existing welcome message, will not show again');
            welcomeShownRef.current = true;
          }
        }
      } catch (e) {
        // Error already logged above
      }
    }

    // Try to restore session ID from localStorage
    const savedSessionId = localStorage.getItem('gisAgentSessionId');
    if (savedSessionId) {
      setSessionId(savedSessionId);
    }

    // Establish initial connection 
    reconnectAttemptsRef.current = 0;
    isConnectingRef.current = false;
    connectionStableRef.current = false;
    connectionStartTimeRef.current = Date.now();
    lastReconnectAttemptRef.current = 0;
    forceReconnectRef.current = false;
    connectWebSocket();

    // Clean up on unmount
    return () => {
      console.log('GISAgentUI unmounting, cleaning up connections');
      cleanupConnection();
      
      // Save messages to localStorage
      if (messages.length > 0) {
        localStorage.setItem('gisAgentMessages', JSON.stringify(messages));
      }
    };
  }, []);

  // Update component to handle visibility changes that might affect WebSocket
  useEffect(() => {
    // Handle visibility changes (tab switching, etc)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Tab visible - checking connection status');
        // Only attempt reconnection if connection isn't stable and we haven't reconnected recently
        const now = Date.now();
        if (!connectionStableRef.current && 
            !isConnectingRef.current && 
            now - lastReconnectAttemptRef.current > MIN_RECONNECT_INTERVAL) {
          console.log('Connection not stable on visibility change - attempting reconnect');
          reconnectAttemptsRef.current = 0; // Reset attempts
          forceReconnectRef.current = true;
          connectWebSocket();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Connection checking with significantly reduced frequency
  useEffect(() => {
    // Only check connection status every 20 seconds to avoid reconnection loops
    const connectionCheckInterval = setInterval(() => {
      // If component is unmounting, don't try to reconnect
      if (!socketRef.current) {
        return;
      }

      const now = Date.now();
      const connectionAge = now - connectionStartTimeRef.current;
      
      // If we haven't had a stable connection for at least 10 seconds, 
      // and we're not currently connecting, and sufficient time has passed since the last attempt
      if (!connectionStableRef.current && 
          !isConnectingRef.current && 
          !isReconnecting && 
          socketRef.current?.readyState !== WebSocket.OPEN &&
          connectionAge > 10000 &&
          now - lastReconnectAttemptRef.current > MIN_RECONNECT_INTERVAL) {
        console.log('Connection check: No stable connection detected, attempting to reconnect');
        reconnectAttemptsRef.current = 0;
        forceReconnectRef.current = true;
        connectWebSocket();
      }
    }, 20000); // Reduced check frequency to 20 seconds to avoid connection thrashing

    return () => {
      clearInterval(connectionCheckInterval);
    };
  }, [isConnected, isReconnecting]);

  // Check for pending messages after connection is established
  useEffect(() => {
    if (isConnected && socketRef.current && connectionStableRef.current) {
      const pendingMessage = localStorage.getItem('gisAgentPendingMessage');
      if (pendingMessage) {
        console.log('Found pending message, sending it now');
        // Create a temporary copy of the message
        const messageToSend = pendingMessage;
        // Clear storage immediately to prevent double sends
        localStorage.removeItem('gisAgentPendingMessage');
        
        // Set the message in the input and send it with a small delay
        setInputValue(messageToSend);
        setTimeout(() => {
          // Create and send the message directly
          addMessage(messageToSend, 'user');
          
          const query = {
            type: 'query',
            query: messageToSend,
            session_id: sessionId
          };
          
          try {
            socketRef.current.send(JSON.stringify(query));
            setIsWaitingForResponse(true);
            setInputValue('');
            
            // Set timeout
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(handleRequestTimeout, requestTimeoutMs);
          } catch (error) {
            console.error('Error sending pending message:', error);
            addMessage('Error sending message: ' + error.message, 'system');
          }
        }, 500);
      }
    }
  }, [isConnected, sessionId, connectionStableRef.current]);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('gisAgentMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Clean up WebSocket connection and intervals
  const cleanupConnection = () => {
    console.log('Cleaning up WebSocket connection and intervals');
    
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
    
    if (stableConnectionTimerRef.current) {
      clearTimeout(stableConnectionTimerRef.current);
      stableConnectionTimerRef.current = null;
    }

    if (socketRef.current) {
      // Set a flag to indicate we're intentionally closing the connection
      socketRef.current.intentionalClose = true;
      socketRef.current.close();
      socketRef.current = null;
    }
    
    if (reconnectIntervalRef.current) {
      clearTimeout(reconnectIntervalRef.current);
      reconnectIntervalRef.current = null;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    isConnectingRef.current = false;
    connectionStableRef.current = false;
  };

  // Setup heartbeat to keep connection alive
  const setupHeartbeat = () => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
    }
    
    // A more effective heartbeat with actual ping frames
    heartbeatIntervalRef.current = setInterval(() => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        console.log('Sending heartbeat ping');
        try {
          // Use heartbeat as the message type instead of ping
          // Some WebSocket servers have specific handling for 'ping' which may cause conflicts
          const heartbeatQuery = {
            type: 'heartbeat',
            session_id: sessionId || 'new_session',
            timestamp: Date.now()
          };
          socketRef.current.send(JSON.stringify(heartbeatQuery));
          lastMessageTimeRef.current = Date.now(); // Update last message time
        } catch (err) {
          console.error('Error sending heartbeat:', err);
          // If we can't send a heartbeat, the connection might be dead
          if (isConnected) {
            setIsConnected(false);
            setServerVerified(false);
            connectionStableRef.current = false;
            // Don't attempt reconnect here - will be handled by the connection check interval
          }
        }
      }
    }, 45000); // Increase heartbeat interval to 45 seconds (was 25 seconds)
  };

  // Ping the server to verify it's working properly - with improved verification
  const pingServer = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      try {
        console.log('Verifying GIS Agent server connection...');
        
        // Instead of using PING_TEST which might be filtered or cause errors,
        // let's use a standard empty message that the server should safely ignore
        const emptyQuery = {
          type: 'query',
          query: ' ',  // Just a space, which server should handle gracefully
          session_id: sessionId || 'new_session'
        };
        
        // Set the server as verified immediately if we can send a message
        // This is more reliable than waiting for a response
        setServerVerified(true);
        
        socketRef.current.send(JSON.stringify(emptyQuery));
        console.log('Empty verification query sent successfully');
        
        // We'll consider the server verified if the socket remains open
        // rather than waiting for a specific response
      } catch (error) {
        console.error('Error verifying connection:', error);
        setServerVerified(false);
      }
    }
  };

  // Connect to WebSocket server with improved error handling
  const connectWebSocket = () => {
    // If already connecting or the component is unmounting, don't try to connect
    if (isConnectingRef.current) {
      console.log('Already attempting to connect, ignoring duplicate connection request');
      return;
    }

    // Check for connection thrashing pattern
    const now = Date.now();
    const recentDisconnects = lastDisconnectTimesRef.current;
    
    // Add current time to disconnect history
    recentDisconnects.push(now);
    
    // Keep only the last 5 disconnects
    if (recentDisconnects.length > 5) {
      recentDisconnects.shift();
    }
    
    // If we have enough data points, check for thrashing pattern
    if (recentDisconnects.length >= 3) {
      // Check if the last 3 disconnects happened within a short period (10 seconds)
      const isConnectionThrashing = 
        (recentDisconnects[recentDisconnects.length-1] - recentDisconnects[recentDisconnects.length-3]) < 10000;
      
      if (isConnectionThrashing) {
        console.warn('Connection thrashing detected! Forcing a longer timeout before reconnecting.');
        // Set a much longer timeout before attempting to reconnect
        setTimeout(() => {
          console.log('Attempting reconnection after forced delay due to connection thrashing');
          forceReconnectRef.current = true;
          lastDisconnectTimesRef.current = []; // Reset thrashing detection
          connectWebSocket();
        }, 180000); // Force a 3-minute delay after thrashing is detected
        return;
      }
    }

    // Enforce minimum time between reconnection attempts to prevent thrashing
    if (!forceReconnectRef.current && now - lastReconnectAttemptRef.current < MIN_RECONNECT_INTERVAL) {
      console.log(`Throttling reconnection attempt. Last attempt: ${new Date(lastReconnectAttemptRef.current).toLocaleTimeString()}`);
      console.log(`Will wait until ${new Date(lastReconnectAttemptRef.current + MIN_RECONNECT_INTERVAL).toLocaleTimeString()} before trying again`);
      return;
    }
    
    // Update the last reconnect time and set connecting state
    lastReconnectAttemptRef.current = now;
    forceReconnectRef.current = false;
    isConnectingRef.current = true;
    connectionStableRef.current = false;
    
    // Prevent multiple connection attempts in parallel
    if (socketRef.current && socketRef.current.readyState === WebSocket.CONNECTING) {
      console.log('Already connecting, aborting new connection attempt');
      isConnectingRef.current = false;
      return;
    }
    
    // Close existing connection if any
    if (socketRef.current) {
      try {
        console.log('Closing existing WebSocket connection');
        socketRef.current.intentionalClose = true;
        socketRef.current.close();
        socketRef.current = null;
      } catch (err) {
        console.error('Error closing existing connection:', err);
      }
    }
    
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    
    // Try different connection options in order based on environment
    const possibleUrls = [
      // Railway deployment URL
      'wss://earth-agent-production-8652.up.railway.app/ws',
      // Try localhost for development
      'ws://localhost:8080/ws',
      // Try same hostname with port 8081
      `${wsProtocol}//${window.location.hostname}:8081/ws`,
      // Try with path /api/gis-agent/ws
      `${wsProtocol}//${window.location.host}/api/gis-agent/ws`,
      // Try with path /ws only
      `${wsProtocol}//${window.location.host}/ws`,
      // Try api subdomain
      `${wsProtocol}//api.${window.location.hostname}/gis-agent/ws`,
    ];
    
    // ALWAYS use Railway URL first (regardless of environment)
    let wsUrl = possibleUrls[0]; // Force Railway URL
    
    // Only check localStorage after forcing Railway URL first
    const lastSuccessfulUrl = localStorage.getItem('gisAgentLastSuccessfulUrl');
    if (lastSuccessfulUrl) {
      console.log(`Using previously successful URL: ${lastSuccessfulUrl}`);
      wsUrl = lastSuccessfulUrl;
    } else {
      // Store Railway URL as the last successful one
      localStorage.setItem('gisAgentLastSuccessfulUrl', wsUrl);
      console.log(`No previous successful URL found, using Railway: ${wsUrl}`);
    }

    try {
      console.log(`Connecting to GIS Agent WebSocket at: ${wsUrl}`);
      console.log(`Current frontend URL: ${window.location.href}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
      
      socketRef.current = new WebSocket(wsUrl);
      
      // Set connection timeout to avoid hanging connections
      const connectionTimeout = setTimeout(() => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.CONNECTING) {
          console.log('Connection timeout - closing socket');
          socketRef.current.intentionalClose = true;
          socketRef.current.close();
          
          // Try the next URL in sequence if available
          tryNextUrl(wsUrl, possibleUrls);
        }
      }, 5000); // 5 second connection timeout
      
      // Flag to track if this is an intentional close
      socketRef.current.intentionalClose = false;

      socketRef.current.onopen = () => {
        console.log('GIS Agent WebSocket connection established');
        clearTimeout(connectionTimeout);
        
        // Remember this URL if it worked
        localStorage.setItem('gisAgentLastSuccessfulUrl', wsUrl);
        
        setIsConnected(true);
        reconnectAttemptsRef.current = 0;
        setIsReconnecting(false);
        lastMessageTimeRef.current = Date.now();
        
        // Set up heartbeat to keep connection alive
        setupHeartbeat();
        
        // Mark the connection as stable after 2 seconds (reduced from 5)
        // This prevents the rapid connect/disconnect cycles
        if (stableConnectionTimerRef.current) {
          clearTimeout(stableConnectionTimerRef.current);
        }
        
        stableConnectionTimerRef.current = setTimeout(() => {
          if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            console.log('Connection considered stable after 2 seconds');
            connectionStableRef.current = true;
            
            // Ping server to verify it's actually working
            setServerVerified(true); // Assume working initially
            pingServer();
          }
        }, 2000);
        
        // Add welcome message ONLY if no messages exist and welcome hasn't been shown
        if (messages.length === 0 && !welcomeShownRef.current) {
          welcomeShownRef.current = true;
          setTimeout(() => {
            addMessage(
              "Welcome to the Earth Agent! I can help you with geographic information and sustainability analysis. How can I assist you today?",
              'assistant'
            );
          }, 500);
        }
      };

      socketRef.current.onclose = (event) => {
        console.log(`WebSocket closed with code: ${event.code}, reason: ${event.reason}, intentional: ${socketRef.current?.intentionalClose}`);
        clearTimeout(connectionTimeout);
        
        setIsConnected(false);
        setServerVerified(false);
        connectionStableRef.current = false;
        
        // Clear heartbeat interval
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
          heartbeatIntervalRef.current = null;
        }
        
        if (stableConnectionTimerRef.current) {
          clearTimeout(stableConnectionTimerRef.current);
          stableConnectionTimerRef.current = null;
        }
        
        isConnectingRef.current = false;
        
        // Don't try to reconnect if this was an intentional close
        if (socketRef.current?.intentionalClose === true) {
          console.log('Connection intentionally closed, not reconnecting');
          socketRef.current = null;
          return;
        }
        
        // If the connection was closed normally (1000) or by the server (1001), 
        // try to reconnect or try another URL
        if (event.code !== 1000 && event.code !== 1001) {
          tryNextUrl(wsUrl, possibleUrls);
        } else {
          // Normal close, try regular reconnect
          handleReconnect();
        }
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket Error:', error);
        console.error(`Failed to connect to ${wsUrl} - checking if endpoint is reachable...`);
        
        // Try to fetch the base URL to verify the server is online
        const baseApiUrl = wsUrl.replace('ws://', 'http://').replace('wss://', 'https://').replace('/ws', '');
        fetch(baseApiUrl, { method: 'GET' })
          .then(response => {
            console.log(`Server at ${baseApiUrl} is reachable, status: ${response.status}`);
          })
          .catch(fetchError => {
            console.error(`Server at ${baseApiUrl} is NOT reachable: ${fetchError.message}`);
            showNotification(`Cannot reach Earth Agent server. Error: ${fetchError.message}`, 'error');
          });
        
        clearTimeout(connectionTimeout);
        
        setConnectionError("Connection error. Please try again or check server status.");
        // Don't show notification here, will be shown when we try next URL
        
        // Ensure we reset connecting state in case of errors
        isConnectingRef.current = false;
        connectionStableRef.current = false;
        
        // Try the next URL after an error
        tryNextUrl(wsUrl, possibleUrls);
      };

      socketRef.current.onmessage = (event) => {
        console.log('Received message from GIS Agent:', event.data);
        
        // Update the last message time for stale connection detection
        lastMessageTimeRef.current = Date.now();
        
        // Clear any running timeouts as we got a response
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        // Any message receipt confirms the server is responsive
        setServerVerified(true);
        
        // Handle special message: ping test response
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'response' && data.response && 
              (data.response.includes('PING_TEST') || data.response.trim() === '' || 
               data.response.includes('I am here') || data.response.includes('How can I help'))) {
            console.log('Server connection verified via empty message response');
            // Don't display empty verification messages to the user
            return;
          }
        } catch (e) {
          // Not a JSON response or parsing error, continue with normal processing
        }
        
        handleServerResponse(event.data);
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      setConnectionError(`Connection failed: ${error.message}`);
      isConnectingRef.current = false;
      tryNextUrl(wsUrl, possibleUrls);
    }
  };
  
  // Helper function to try the next URL in the list
  const tryNextUrl = (currentUrl, urlList) => {
    // Find the current URL in the list
    const currentIndex = urlList.indexOf(currentUrl);
    
    // If we have more URLs to try
    if (currentIndex >= 0 && currentIndex < urlList.length - 1) {
      const nextUrl = urlList[currentIndex + 1];
      console.log(`Trying next URL: ${nextUrl}`);
      
      // Store the URL we're trying next
      localStorage.setItem('gisAgentLastAttemptedUrl', nextUrl);
      
      // Wait a short delay before trying the next URL
      setTimeout(() => {
        // Only try if we haven't connected yet
        if (!isConnected && !isConnectingRef.current) {
          // Create a new WebSocket with this URL
          console.log(`Now connecting to alternate URL: ${nextUrl}`);
          forceReconnectRef.current = true;
          connectWebSocket();
        }
      }, 1000);
    } else {
      // We've tried all URLs, fall back to normal reconnect behavior
      handleReconnect();
    }
  };
  
  // Handle reconnection with backoff
  const handleReconnect = () => {
    if (reconnectAttemptsRef.current < maxReconnectAttempts) {
      reconnectAttemptsRef.current++;
      
      // Exponential backoff with jitter for reconnection
      const baseDelay = 5000; // 5 second base (increased from 1 second)
      const maxDelay = 180000; // 3 minutes max (increased from 30 seconds)
      
      // Calculate delay with exponential backoff and add some randomness
      const exponentialDelay = Math.min(
        baseDelay * Math.pow(2, reconnectAttemptsRef.current - 1),
        maxDelay
      );
      const jitter = Math.random() * 2000; // Add up to 2 seconds of jitter
      const delay = exponentialDelay + jitter;
      
      console.log(`Attempting to reconnect in ${Math.round(delay/1000)} seconds (attempt ${reconnectAttemptsRef.current} of ${maxReconnectAttempts})`);
      setIsReconnecting(true);
      setConnectionError(`Reconnecting in ${Math.round(delay/1000)} seconds... (Attempt ${reconnectAttemptsRef.current} of ${maxReconnectAttempts})`);
      
      reconnectIntervalRef.current = setTimeout(() => {
        // Only attempt reconnection if we're still disconnected
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
          console.log('Reconnecting after delay');
          isConnectingRef.current = false; // Ensure flag is reset before reconnecting
          connectWebSocket();
        } else {
          console.log('Already reconnected, canceling scheduled reconnect');
          setIsReconnecting(false);
        }
      }, delay);
    } else {
      console.log('Max reconnect attempts reached');
      setIsReconnecting(false);
      setConnectionError("Unable to connect to GIS Agent. Please check if the server is running and refresh the page to try again.");
      showNotification(
        "Unable to connect to Earth Agent. Please check if the server is running.",
        'error'
      );
      isConnectingRef.current = false;
    }
  };

  // Handle server response with improved parsing and error handling
  const handleServerResponse = (data) => {
    try {
      let response;
      
      // Try to parse JSON response
      try {
        response = JSON.parse(data);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        addMessage(`Received invalid response from server: ${data.substring(0, 100)}...`, 'system');
        setIsWaitingForResponse(false);
        return;
      }

      // Log the response type for debugging
      console.log('Response type:', response.type);

      // Handle ping/heartbeat responses (updated)
      if (response.type === 'ping' || response.type === 'pong' || response.type === 'heartbeat') {
        console.log('Received ping/heartbeat message from server - connection healthy');
        // Don't display anything to the user, this is just for keeping the connection alive
        return;
      }

      // Handle unknown message types gracefully
      if (!['session_info', 'history_cleared', 'response', 'tool_result_with_analysis', 
             'tool_result', 'stream_start', 'stream_content', 'stream_end'].includes(response.type)) {
        console.warn(`Unknown message type received: ${response.type}`, response);
        // Don't show error to user, just log it and continue
        return;
      }

      // Handle session info message
      if (response.type === 'session_info') {
        console.log('Session established:', response.session_id);
        setSessionId(response.session_id);
        localStorage.setItem('gisAgentSessionId', response.session_id);
        return;
      }

      // Handle history cleared message
      if (response.type === 'history_cleared') {
        addMessage('Conversation history has been cleared.', 'assistant');
        setIsWaitingForResponse(false);
        return;
      }

      // Handle error response
      if (response.error) {
        addMessage(`Error: ${response.error}`, 'assistant');
        setIsWaitingForResponse(false);
        return;
      }

      // Handle standard text response
      if (response.type === 'response') {
        // Simple formatting for JSON content that might be in the response
        let messageText = response.response || 'I received your message but the response was empty.';
        
        // Filter out welcome messages if we've already shown one
        if (welcomeShownRef.current && isWelcomeMessage(messageText)) {
          console.log('Filtering out duplicate welcome message from server');
          setIsWaitingForResponse(false);
          return;
        }
        
        // If this is a welcome message and we haven't shown one yet, mark it as shown
        if (!welcomeShownRef.current && isWelcomeMessage(messageText)) {
          welcomeShownRef.current = true;
        }
        
        // Format the raw JSON to make it more readable but keep the original message structure
        messageText = formatJSONInText(messageText);
        
        addMessage(messageText, 'assistant');
        setIsWaitingForResponse(false);
        return;
      }

      // Handle tool result with analysis
      if (response.type === 'tool_result_with_analysis') {
        // Skip showing the tool data completely, only log it
        console.log('Tool executed:', response.tool_name, 'with arguments:', response.arguments);
        console.log('Tool result:', response.result);
        
        // ONLY add the analysis if it exists
        if (response.analysis) {
          addMessage(response.analysis, 'assistant');
        } else {
          // If no analysis provided, create a generic response
          addMessage("I've processed your request but couldn't generate a detailed analysis.", 'assistant');
        }
        setIsWaitingForResponse(false);
        return;
      }

      // Handle simple tool result - NEVER show these
      if (response.type === 'tool_result') {
        // Skip showing the raw tool data entirely
        console.log('Tool executed:', response.tool_name, 'with arguments:', response.arguments);
        console.log('Tool result:', response.result);
        
        // We don't want to show anything for this response type
        // But we need to inform the user that something happened
        addMessage("I'm analyzing your request...", 'assistant');
        setIsWaitingForResponse(false);
        return;
      }

      // Handle streaming response if supported
      if (response.type === 'stream_start') {
        addMessage('', 'assistant', false, true);
        return;
      }

      if (response.type === 'stream_content') {
        appendToLastMessage(response.content);
        return;
      }

      if (response.type === 'stream_end') {
        finishStreamingLastMessage();
        setIsWaitingForResponse(false);
        return;
      }

      // Fallback for unknown response types
      console.log('Unknown response format:', response);
      addMessage('I received an unexpected response format.', 'assistant');
      setIsWaitingForResponse(false);
    } catch (error) {
      console.error('Error handling server response:', error);
      addMessage('Error processing the response from the server.', 'assistant');
      setIsWaitingForResponse(false);
    }
  };

  // Helper function to format JSON in text without changing overall structure
  const formatJSONInText = (text) => {
    // If text doesn't contain brackets, return it as is
    if (!text.includes('{') && !text.includes('[')) return text;
    
    try {
      // Try to find JSON objects or arrays in the text
      return text.replace(/(\{[^{}]*(\{[^{}]*\}[^{}]*)*\}|\[[^\[\]]*(\[[^\[\]]*\][^\[\]]*)*\])/g, match => {
        try {
          // Try to parse and prettify JSON
          const obj = JSON.parse(match);
          return '```\n' + JSON.stringify(obj, null, 2) + '\n```';
        } catch (e) {
          // If parsing fails, return the original text
          return match;
        }
      });
    } catch (e) {
      console.warn('Error formatting JSON in text:', e);
      return text;
    }
  };

  // Handle request timeout
  const handleRequestTimeout = () => {
    console.error('Request timed out after', requestTimeoutMs, 'ms');
    setIsWaitingForResponse(false);
    addMessage(
      "I didn't receive a response from the server within the expected time. This could be due to:"+
      "\n1. The server is overloaded or slow to respond"+
      "\n2. The GIS Agent service is not running properly"+
      "\n3. There's an issue with network connectivity"+
      "\n\nPlease try again or ask your system administrator to check the GIS Agent service.",
      'system'
    );
  };

  // Add a message to the chat
  const addMessage = (text, sender, isToolData = false, isStreaming = false) => {
    // Don't add tool data messages to the chat
    if (isToolData) {
      console.log('Skipping tool data message:', text);
      return;
    }
    
    const newMessage = {
      id: Date.now() + Math.random(),
      text: text,
      sender,
      timestamp: new Date().toISOString(),
      isToolData: false, // Never set this to true anymore
      isStreaming
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  // Append content to the last message (for streaming)
  const appendToLastMessage = (content) => {
    setMessages((prev) => {
      const messages = [...prev];
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage && lastMessage.isStreaming) {
        messages[messages.length - 1] = {
          ...lastMessage,
          text: lastMessage.text + content
        };
      }
      
      return messages;
    });
  };

  // Mark the last message as no longer streaming
  const finishStreamingLastMessage = () => {
    setMessages((prev) => {
      const messages = [...prev];
      const lastMessage = messages[messages.length - 1];
      
      if (lastMessage && lastMessage.isStreaming) {
        messages[messages.length - 1] = {
          ...lastMessage,
          isStreaming: false
        };
      }
      
      return messages;
    });
  };

  // Send a message to the server with improved message format
  const sendMessage = () => {
    if (!inputValue.trim() || isWaitingForResponse) return;

    // If not connected, try to reconnect
    if (!isConnected) {
      reconnectAttemptsRef.current = 0;
      showNotification('Trying to connect to Earth Agent server...', 'info');
      connectWebSocket();
      
      // Store the message to send after connection
      localStorage.setItem('gisAgentPendingMessage', inputValue);
      return;
    }

    // Add user message to chat
    addMessage(inputValue, 'user');

    // Prepare query to send with the correct format for GIS_Agent
    const query = {
      type: 'query',
      query: inputValue,
      session_id: sessionId
    };

    // Send to server if connected
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log('Sending message to GIS Agent:', query);
      
      // Set a timeout for the request
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(handleRequestTimeout, requestTimeoutMs);
      
      // Send the message
      try {
        socketRef.current.send(JSON.stringify(query));
        setIsWaitingForResponse(true);
        setInputValue('');
      } catch (error) {
        console.error('Error sending message:', error);
        clearTimeout(timeoutRef.current);
        addMessage('Error sending message: ' + error.message, 'system');
        setIsWaitingForResponse(false);
      }
    } else {
      addMessage('Unable to send message: not connected to server.', 'system');
      showNotification('Not connected to Earth Agent server', 'error');
    }
  };

  // Retry connection button handler
  const handleRetryConnection = () => {
    console.log('Manual reconnection attempt');
    cleanupConnection(); // Ensure all previous connections are cleaned up
    reconnectAttemptsRef.current = 0;
    setConnectionError(null);
    isConnectingRef.current = false;
    forceReconnectRef.current = true;
    // Reset any stored URLs to start fresh
    localStorage.removeItem('gisAgentLastSuccessfulUrl');
    localStorage.removeItem('gisAgentLastAttemptedUrl');
    connectWebSocket();
  };

  // Force cancel the current request
  const handleCancelRequest = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setIsWaitingForResponse(false);
    addMessage('Request cancelled by user.', 'system');
  };

  // Clear the chat history
  const clearHistory = () => {
    if (!isConnected || isWaitingForResponse) return;

    const clearRequest = {
      type: 'clear_history',
      session_id: sessionId
    };

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(clearRequest));
      setMessages([]); // Clear local messages immediately
      localStorage.removeItem('gisAgentMessages'); // Clear from localStorage
      welcomeShownRef.current = false; // Reset welcome message flag
      showNotification('Chat history cleared', 'info');
    } else {
      showNotification('Not connected to server', 'error');
    }
  };

  // Handle Enter key press in input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Handle textarea auto-grow
  const handleTextareaInput = (e) => {
    const textarea = e.target;
    
    // Reset height to calculate new height
    textarea.style.height = 'auto';
    
    // Set new height based on scrollHeight (with max height limit)
    const newHeight = Math.min(textarea.scrollHeight, 120);
    textarea.style.height = `${newHeight}px`;
    
    // Update input value
    setInputValue(e.target.value);
  };

  // Format pre elements for better content readability
  const formatMessageContent = (content) => {
    // Replace code blocks with proper styling
    if (content.includes('```')) {
      const parts = content.split(/(```(?:json)?\n[\s\S]*?\n```)/g);
      return parts.map((part, i) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          // Extract the code content
          const codeContent = part.substring(part.indexOf('\n') + 1, part.lastIndexOf('\n'));
          return (
            <div key={i} className="code-block">
              <pre>{codeContent}</pre>
            </div>
          );
        }
        // Process bold text within non-code parts
        return <span key={i} dangerouslySetInnerHTML={{ __html: processMarkdown(part) }}></span>;
      });
    }
    
    // Process bold text in regular messages
    return <div dangerouslySetInnerHTML={{ __html: processMarkdown(content) }}></div>;
  };
  
  // Process markdown-style bold text (**bold**) to HTML
  const processMarkdown = (text) => {
    // Replace **text** with <strong>text</strong>
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  // Helper function to identify welcome messages
  const isWelcomeMessage = (text) => {
    const welcomePhrases = [
      'welcome to the gis',
      'i am here and ready to assist',
      'how can i assist you',
      'ready to help you',
      'how i can help you',
      'let me know how i can help'
    ];
    
    const lowerText = text.toLowerCase();
    return welcomePhrases.some(phrase => lowerText.includes(phrase));
  };

  // Reset all connection settings in localStorage
  const resetConnectionSettings = () => {
    localStorage.removeItem('gisAgentLastSuccessfulUrl');
    localStorage.removeItem('gisAgentLastAttemptedUrl');
    localStorage.removeItem('gisAgentSessionId');
    
    // Force refresh the URL to the Railway one
    const railwayUrl = 'wss://earth-agent-production-8652.up.railway.app/ws';
    localStorage.setItem('gisAgentLastSuccessfulUrl', railwayUrl);
    
    console.log('Reset all connection settings and forced Railway URL');
    showNotification('Connection settings reset, trying Railway URL', 'info');
    
    // Retry connection
    handleRetryConnection();
  };

  return (
    <div className="gisagent-container">
      <div className="gisagent-header" style={{flexDirection: 'column', alignItems: 'flex-start', gap: 0, paddingBottom: 0}}>
        <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 4}}>
          <div className="gisagent-title">
            <MapPin size={18} />
            <span>Earth Agent</span>
          </div>
          <div className="gisagent-controls">
            <button 
              className="clear-history-btn" 
              onClick={clearHistory}
              disabled={!isConnected || isWaitingForResponse || messages.length === 0}
              title="Clear conversation history"
            >
              <RotateCcw size={16} />
            </button>
            <button
              className="retry-btn"
              onClick={resetConnectionSettings}
              title="Reset connection settings"
              style={{marginLeft: '4px'}}
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
        <div style={{width: '100%', marginTop: 2, marginBottom: 2}}>
          <div className={`connection-status ${isConnected ? (serverVerified ? 'connected' : 'warning') : isReconnecting ? 'reconnecting' : 'disconnected'}`}
            style={{marginLeft: 0, marginTop: 0}}>
            {isReconnecting ? 'Reconnecting...' : 
             isConnected ? (serverVerified ? 'Connected' : 'Connected (Verifying...)') : 
             'Disconnected'}
          </div>
        </div>
      </div>

      <div className="gisagent-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            {connectionError ? (
              <>
                <AlertTriangle size={32} className="error-icon" />
                <h4>Connection Error</h4>
                <p>{connectionError}</p>
                <button className="retry-connection-btn" onClick={handleRetryConnection}>
                  Retry Connection
                </button>
              </>
            ) : (
              <>
                <MapPin size={32} className="empty-icon" />
                <h4>Earth Agent</h4>
                <p>Use this agent for geographic information and sustainability analysis</p>
              </>
            )}
          </div>
        ) : (
          // Filter out any potential tool data messages before rendering
          messages
            .filter(message => !message.isToolData)
            .map((message) => {
              // Different rendering for user vs assistant messages
              if (message.sender === 'user') {
                // User message with avatar
                return (
                  <div
                    key={message.id}
                    className="gisagent-message message-user"
                  >
                    <div className="message-avatar">
                      <div className="avatar-user">U</div>
                    </div>
                    <div className="message-content">
                      {formatMessageContent(message.text)}
                    </div>
                    <div className="message-timestamp">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              } else if (message.sender === 'system') {
                // System message
                return (
                  <div
                    key={message.id}
                    className="gisagent-message message-system"
                  >
                    <div className="message-content">
                      {formatMessageContent(message.text)}
                    </div>
                    <div className="message-timestamp">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              } else {
                // Assistant message with NO avatar or icon
                return (
                  <div
                    key={message.id}
                    className={`gisagent-message message-assistant ${message.isStreaming ? 'streaming' : ''}`}
                  >
                    <div className="message-content">
                      {formatMessageContent(message.text)}
                    </div>
                    <div className="message-timestamp">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              }
            })
        )}
        {isWaitingForResponse && !messages.some(m => m.isStreaming) && (
          <div className="gisagent-message message-assistant processing">
            <div className="message-content">
              <div className="typing-indicator">
                <div className="spinner"></div>
                <span>Processing your request</span>
              </div>
              <div className="processing-status">
                Analyzing geographic data...
              </div>
            </div>
            <button 
              className="cancel-request-btn" 
              onClick={handleCancelRequest}
              title="Cancel request"
            >
              <RefreshCw size={16} />
              <span>Cancel</span>
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Hide debug panel in production */}
      <div className="connection-debug-panel">
        <span>{`Status: ${socketRef.current ? 
          (socketRef.current.readyState === WebSocket.CONNECTING ? 'CONNECTING' : 
           socketRef.current.readyState === WebSocket.OPEN ? 'OPEN' : 
           socketRef.current.readyState === WebSocket.CLOSING ? 'CLOSING' : 
           socketRef.current.readyState === WebSocket.CLOSED ? 'CLOSED' : 'UNKNOWN') 
          : 'NO CONNECTION'}`}</span>
        <span>{`Last Msg: ${new Date(lastMessageTimeRef.current).toLocaleTimeString()}`}</span>
        <span>{`Attempts: ${reconnectAttemptsRef.current}`}</span>
      </div>

      <div className="gisagent-input-area">
        <textarea
          value={inputValue}
          onChange={handleTextareaInput}
          onKeyPress={handleKeyPress}
          placeholder={isConnected 
            ? "Ask about geographic data, sustainability analysis, or urban planning..." 
            : isReconnecting 
              ? "Reconnecting to Earth Agent..." 
              : "Connection to Earth Agent failed. Click to retry."}
          disabled={!isConnected || isWaitingForResponse}
          rows={1}
          className="gisagent-input"
          onClick={() => {
            if (!isConnected && !isReconnecting) {
              handleRetryConnection();
            }
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim() || !isConnected || isWaitingForResponse}
          className="gisagent-send-btn"
          title="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

GISAgentUI.propTypes = {
  showNotification: PropTypes.func.isRequired
};

export default GISAgentUI; 