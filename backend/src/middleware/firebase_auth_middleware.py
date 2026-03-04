import firebase_admin
from firebase_admin import auth, credentials
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import FastAPI, Request, Response
import logging
import json
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN

logger = logging.getLogger(__name__)

class FirebaseAuthMiddleware(BaseHTTPMiddleware):
    def __init__(
        self, 
        app: FastAPI, 
        public_paths: list = None
    ):
        super().__init__(app)
        self.public_paths = public_paths or [
            "/api/docs",           # Swagger docs
            "/api/redoc",          # ReDoc
            "/api/openapi.json",   # OpenAPI schema
            "/api/health",         # Health check
            "/static",             # Static files
        ]
    
    async def dispatch(self, request: Request, call_next):
        # Always allow OPTIONS requests (CORS preflight)
        if request.method == "OPTIONS":
            return await call_next(request)
            
        # Skip auth for public paths
        path = request.url.path
        if self._is_public_path(path):
            return await call_next(request)
        
        # Check for authorization header
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return Response(
                status_code=HTTP_401_UNAUTHORIZED,
                content=json.dumps({"detail": "Missing or invalid authorization header"}),
                media_type="application/json"
            )
        
        # Extract and verify token
        token = auth_header.split(" ")[1]
        try:
            decoded_token = auth.verify_id_token(token)
            # Add user info to request state
            request.state.user = decoded_token
            request.state.user_id = decoded_token.get("uid")
            return await call_next(request)
        except Exception as e:
            logger.error(f"Firebase auth error: {e}")
            return Response(
                status_code=HTTP_403_FORBIDDEN,
                content=json.dumps({"detail": "Invalid or expired token"}),
                media_type="application/json"
            )
    
    def _is_public_path(self, path: str) -> bool:
        """Check if the path should be publicly accessible without auth"""
        return any(path.startswith(public_path) for public_path in self.public_paths) 