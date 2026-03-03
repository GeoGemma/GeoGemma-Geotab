import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/loginPopup.css';

const LoginPopup = ({ onClose }) => {
  const { signInWithGoogle, error: authError, isRedirecting } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(authError);

  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        onClose();
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Format the error message for display
  const formatErrorMessage = (errorMsg) => {
    if (!errorMsg) return null;
    
    // Convert Firebase error messages to user-friendly messages
    if (errorMsg.includes('auth/internal-error')) {
      return "Authentication error. Please try again or use a different browser.";
    }
    if (errorMsg.includes('auth/popup-closed-by-user')) {
      return "Sign-in was cancelled. Please try again.";
    }
    if (errorMsg.includes('auth/popup-blocked')) {
      return "Pop-up was blocked by your browser. Please allow pop-ups for this site.";
    }
    
    return errorMsg;
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup">
        <div className="login-popup-header">
          <h2>Sign In Required</h2>
          <button className="close-button" onClick={onClose} disabled={isLoading || isRedirecting}>×</button>
        </div>
        <div className="login-popup-content">
          <p>Please sign in to use GeoGemma's features.</p>
          {(error || authError) && (
            <div className="error-message">
              {formatErrorMessage(error || authError)}
            </div>
          )}
          <button 
            className="google-signin-button" 
            onClick={handleSignIn}
            disabled={isLoading || isRedirecting}
          >
            {isLoading || isRedirecting ? (
              <span>Loading...</span>
            ) : (
              <>
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google logo" 
                />
                Sign in with Google
              </>
            )}
          </button>
          {isRedirecting && <p className="redirect-message">Redirecting to Google login...</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPopup; 