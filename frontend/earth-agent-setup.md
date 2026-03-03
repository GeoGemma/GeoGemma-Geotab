# Earth Agent Integration Guide

This guide explains how to connect your GeoGemma frontend to the Earth Agent deployed on Railway.

## Earth Agent Service Information

- **API Base URL**: `https://earth-agent-production-8652.up.railway.app`
- **WebSocket Endpoint**: `wss://earth-agent-production-8652.up.railway.app/ws`
- **Health Check**: `https://earth-agent-production-8652.up.railway.app/health`
- **API Docs**: `https://earth-agent-production-8652.up.railway.app/api/docs`

## Integration Complete

The frontend has been updated to connect to the Earth Agent on Railway. The following changes were made:

1. Updated WebSocket connection URLs in `src/components/Sidebar/GISAgentUI.jsx`
2. Added Earth Agent URL references in `src/services/api.js`

## Testing the Connection

Once your frontend is running, the Earth Agent component should automatically connect to the Railway deployment. You can verify this by:

1. Opening your browser's developer tools (F12 or Cmd+Option+I)
2. Going to the Network tab
3. Filtering by "WS" (WebSocket)
4. You should see a connection to `wss://earth-agent-production-8652.up.railway.app/ws`

## Troubleshooting

If the connection fails:

1. Verify the Earth Agent is running by visiting `https://earth-agent-production-8652.up.railway.app/`
2. Check browser console for any connection errors
3. The application will automatically try alternative connection methods if the primary one fails

## Environment Configuration (Optional)

For complete configuration, you can create or update environment files:

```bash
# .env.production
VITE_BACKEND_URL=https://geogemma-backend-1075098518283.us-central1.run.app
VITE_EARTH_AGENT_URL=wss://earth-agent-production-8652.up.railway.app/ws
```

After updating environment files, rebuild your application with:

```bash
npm run build
```

## Reverting to Local Development

For local development with a local Earth Agent instance:

1. Change the `process.env.NODE_ENV` condition in `GISAgentUI.jsx`
2. Or run your local Earth Agent on port 8080 and the frontend will automatically detect it 