import logging
from fastapi import APIRouter, HTTPException, Depends, Request
from typing import Dict, Any, List

from src.models.schemas import UserProfile
from src.services.firestore_service import firestore_service
from src.utils.auth_utils import get_current_user, get_user_id

logger = logging.getLogger(__name__)

# Create router
router = APIRouter()

@router.post("/user-profile")
async def create_user_profile(profile: UserProfile, user_id: str = Depends(get_user_id)) -> Dict[str, str]:
    """
    Create or update a user profile.
    
    Args:
        profile: The user profile to create or update
        user_id: The authenticated user ID (from token)
        
    Returns:
        Status message
    """
    try:
        # Ensure the authenticated user can only create/update their own profile
        if profile.user_id != user_id:
            raise HTTPException(status_code=403, detail="You can only manage your own profile")
            
        firestore_service.create_user_profile(profile.user_id, profile.profile)
        return {"status": "success"}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception(f"Error creating user profile: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create user profile: {str(e)}")

@router.get("/user-profile/{user_id}")
async def get_user_profile(user_id_param: str, current_user_id: str = Depends(get_user_id)) -> Dict[str, Any]:
    """
    Get a user profile by ID.
    
    Args:
        user_id_param: The user ID to look up
        current_user_id: The authenticated user ID (from token)
        
    Returns:
        The user profile
    """
    # Check if the authenticated user is requesting their own profile
    if user_id_param != current_user_id:
        raise HTTPException(status_code=403, detail="You can only access your own profile")
        
    profile = firestore_service.get_user_profile(user_id_param)
    if not profile:
        raise HTTPException(status_code=404, detail="User not found")
    return profile

@router.patch("/user-profile/{user_id}")
async def update_user_profile(
    user_id_param: str, 
    updates: Dict[str, Any], 
    current_user_id: str = Depends(get_user_id)
) -> Dict[str, str]:
    """
    Update a user profile with partial data.
    
    Args:
        user_id_param: The user ID to update
        updates: The partial update data
        current_user_id: The authenticated user ID (from token)
        
    Returns:
        Status message
    """
    # Check if the authenticated user is updating their own profile
    if user_id_param != current_user_id:
        raise HTTPException(status_code=403, detail="You can only update your own profile")
        
    try:
        firestore_service.update_user_profile(user_id_param, updates)
        return {"status": "updated"}
    except Exception as e:
        logger.exception(f"Error updating user profile: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update user profile: {str(e)}") 