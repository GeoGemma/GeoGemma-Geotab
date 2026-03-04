from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from firebase_admin import auth
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

class TokenVerifyRequest(BaseModel):
    token: str

@router.post("/verify-token")
async def verify_token(request: TokenVerifyRequest):
    """Verify a Firebase ID token and return the decoded user info"""
    try:
        decoded_token = auth.verify_id_token(request.token)
        return {
            "valid": True,
            "user_id": decoded_token.get("uid"),
            "email": decoded_token.get("email"),
            "expires": decoded_token.get("exp")
        }
    except Exception as e:
        logger.error(f"Token verification error: {e}")
        return {
            "valid": False,
            "error": str(e)
        }

@router.get("/me")
async def get_current_user(request: Request):
    """Get the current authenticated user info"""
    try:
        user_id = request.state.user_id
        user_record = auth.get_user(user_id)
        return {
            "uid": user_record.uid,
            "email": user_record.email,
            "display_name": user_record.display_name,
            "photo_url": user_record.photo_url,
            "email_verified": user_record.email_verified
        }
    except Exception as e:
        logger.error(f"Error getting user info: {e}")
        raise HTTPException(status_code=400, detail=str(e)) 