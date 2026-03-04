import logging
import datetime
from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any, List

from src.models.schemas import CustomAreaRequest, ApiResponse, CustomAreaData
from src.services.firestore_service import firestore_service
from src.utils.auth_utils import get_current_user, get_user_id

logger = logging.getLogger(__name__)

# Create router
router = APIRouter()

@router.post("/custom-area", response_model=ApiResponse)
async def create_custom_area(request: CustomAreaRequest, user_id: str = Depends(get_user_id)) -> ApiResponse:
    """
    API endpoint to create a custom area for analysis.
    
    Args:
        request: The custom area request with name, description, and geometry
        user_id: The authenticated user ID (from token)
        
    Returns:
        API response with the created area
    """
    try:
        # Create a simple ID for the custom area
        area_id = f"area_{datetime.datetime.now().strftime('%Y%m%d%H%M%S%f')}"
        
        # Log the creation
        logger.info(f"Custom area '{request.name}' defined by user {user_id} (ID: {area_id}). Geometry: {request.geometry['type']}")
        
        return ApiResponse(success=True, message="Custom area defined (not saved)", data={
            "id": area_id,
            "name": request.name,
            "description": request.description,
            "user_id": user_id
            # "geometry": request.geometry  # Optionally return geometry
        })
    except Exception as e:
        logger.exception("Error creating custom area")
        return ApiResponse(success=False, message=f"Error: {str(e)}")

@router.post("/custom-areas")
async def save_custom_area(data: CustomAreaData, current_user_id: str = Depends(get_user_id)) -> Dict[str, str]:
    """
    Save a custom area to Firestore.
    
    Args:
        data: The custom area data to save
        current_user_id: The authenticated user ID (from token)
        
    Returns:
        Status message
    """
    try:
        # Ensure the authenticated user can only save their own custom areas
        if data.user_id != current_user_id:
            raise HTTPException(status_code=403, detail="You can only save custom areas for your own account")
            
        firestore_service.save_custom_area(data.user_id, data.area_id, data.area)
        return {"status": "success"}
    except HTTPException:
        raise
    except Exception as e:
        logger.exception(f"Error saving custom area: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to save custom area: {str(e)}")

@router.get("/custom-areas/{user_id}")
async def get_custom_areas(user_id_param: str, current_user_id: str = Depends(get_user_id)) -> List[Dict[str, Any]]:
    """
    Get all custom areas for a user from Firestore.
    
    Args:
        user_id_param: The user ID to look up
        current_user_id: The authenticated user ID (from token)
        
    Returns:
        List of custom areas
    """
    try:
        # Ensure the authenticated user can only get their own custom areas
        if user_id_param != current_user_id:
            raise HTTPException(status_code=403, detail="You can only access your own custom areas")
            
        return firestore_service.get_custom_areas(user_id_param)
    except HTTPException:
        raise
    except Exception as e:
        logger.exception(f"Error getting custom areas: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to get custom areas: {str(e)}") 