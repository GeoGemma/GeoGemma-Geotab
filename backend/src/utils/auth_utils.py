import logging
from fastapi import Request, HTTPException, Depends
from starlette.status import HTTP_401_UNAUTHORIZED, HTTP_403_FORBIDDEN
from firebase_admin import auth
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

async def get_current_user(request: Request) -> Dict[str, Any]:
    """
    Get the current authenticated user from request state.
    This function can be used as a dependency in FastAPI routes.
    
    Args:
        request: The FastAPI request object
        
    Returns:
        The user information from the decoded token
        
    Raises:
        HTTPException: If no user is authenticated
    """
    user = getattr(request.state, "user", None)
    if not user:
        logger.error("No authenticated user found in request state")
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    return user

async def get_user_id(request: Request) -> str:
    """
    Get the current authenticated user ID from request state.
    This function can be used as a dependency in FastAPI routes.
    
    Args:
        request: The FastAPI request object
        
    Returns:
        The user ID from the decoded token
        
    Raises:
        HTTPException: If no user is authenticated
    """
    user_id = getattr(request.state, "user_id", None)
    if not user_id:
        logger.error("No authenticated user ID found in request state")
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    return user_id

async def verify_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Verify a Firebase ID token.
    
    Args:
        token: The Firebase ID token to verify
        
    Returns:
        The decoded token claims if verification succeeds, None otherwise
    """
    try:
        return auth.verify_id_token(token)
    except Exception as e:
        logger.error(f"Token verification error: {e}")
        return None

async def get_optional_user_id(request: Request) -> Optional[str]:
    """
    Get the current authenticated user ID from request state, if available.
    This function can be used for routes that support both authenticated and unauthenticated access.
    
    Args:
        request: The FastAPI request object
        
    Returns:
        The user ID from the decoded token, or None if not authenticated
    """
    return getattr(request.state, "user_id", None) 