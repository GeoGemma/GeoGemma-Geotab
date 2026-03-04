# Professional Vibe Coding Prompts - GeoGemma Project

A comprehensive collection of production-grade prompts used during the vibe coding journey to build GeoGemma, its chat interface, and the Earth Agent (GIS Agent). Each prompt is designed to be actionable, specific, and professionally structured.

---

## 🎯 Phase 1: Project Vision & Architecture

### Prompt 1: Initial Vision & Problem Statement
```
I want to build GeoGemma - a revolutionary Earth observation platform that democratizes access to 
satellite imagery through natural language interaction. The problem we're solving: Currently, accessing 
Google Earth Engine's petabytes of geospatial data requires complex GIS expertise, programming knowledge, 
and understanding of satellite data formats. This creates a massive barrier for researchers, educators, 
policymakers, and sustainability advocates.

The vision: Users should simply ask "Show me NDVI in Paris" or "What's the deforestation rate in the 
Amazon?" and instantly see beautiful visualizations on an interactive map with AI-powered explanations.

Create a comprehensive project overview including:
- Target users (scientists, educators, policy makers, students)
- Core value proposition
- Key differentiators from existing tools
- Success metrics
- Technical feasibility assessment
```

### Prompt 2: System Architecture Design
```
Design a scalable, production-ready three-tier architecture for GeoGemma:

FRONTEND REQUIREMENTS:
- Modern React SPA with component-based architecture
- High-performance map rendering (evaluate MapLibre GL JS vs Leaflet)
- Responsive design (desktop, tablet, mobile)
- Real-time updates and WebSocket support
- Progressive Web App capabilities
- Offline-first data strategy

BACKEND REQUIREMENTS:
- Async Python web framework (FastAPI recommended)
- Microservices-oriented design with clear separation of concerns
- RESTful API with versioning
- WebSocket server for real-time features
- Rate limiting and request throttling
- Comprehensive error handling and logging
- Health check and monitoring endpoints

SERVICE LAYER:
- Earth Engine service (satellite data processing)
- AI service (Gemini integration for NLP)
- Authentication service (Firebase Auth)
- Database service (Firestore)
- Caching layer (Redis)
- File storage service (Cloud Storage)

Provide:
- Detailed architecture diagram format (suggest Mermaid or draw.io)
- Data flow diagrams for key user journeys
- API contract specifications
- Security considerations at each layer
- Scalability and performance strategies
```

### Prompt 3: Technology Stack Justification
```
Recommend and provide detailed justification for each technology choice:

FRONTEND STACK:
- Framework: React vs Vue vs Svelte (consider team expertise, ecosystem, performance)
- Build Tool: Vite vs Webpack vs Parcel
- Mapping: MapLibre GL JS vs Leaflet vs Google Maps API vs OpenLayers
- UI Framework: Tailwind CSS vs Material-UI vs Ant Design vs Custom
- State Management: Context API vs Redux vs Zustand vs Recoil
- HTTP Client: Axios vs Fetch API
- Testing: Vitest vs Jest, React Testing Library, Playwright vs Cypress

BACKEND STACK:
- Framework: FastAPI vs Django vs Flask
- Earth Engine: Python API vs JavaScript API
- AI Integration: Google Gemini vs OpenAI vs Local models
- Caching: Redis vs Memcached vs In-memory
- Task Queue: Celery vs RQ vs Cloud Tasks
- Testing: pytest vs unittest

INFRASTRUCTURE:
- Containerization: Docker + Docker Compose
- Orchestration: Kubernetes vs Cloud Run vs App Engine
- CDN: Cloudflare vs Fastly vs Cloud CDN
- Monitoring: Cloud Monitoring vs Datadog vs Prometheus + Grafana
- CI/CD: GitHub Actions vs Cloud Build vs GitLab CI

For each choice, provide:
1. Justification with pros/cons
2. Performance implications
3. Cost considerations
4. Learning curve assessment
5. Community support and ecosystem
6. Long-term maintenance considerations
```

### Prompt 4: Data Flow & User Journey Mapping
```
Map out complete data flows for key user journeys:

JOURNEY 1: Natural Language Query
User Input → NLP Processing → Geocoding → Earth Engine Query → Tile Generation → Map Display
Detail each step including:
- API endpoints called
- Data transformations
- Error handling at each stage
- Expected response times
- Caching strategies

JOURNEY 2: AI Chat Interaction
User Message → Context Assembly → Gemini API → Response Generation → Action Execution → UI Update

JOURNEY 3: Time Series Analysis
Location Selection → Date Range → Data Collection → Processing → Visualization → Export

JOURNEY 4: User Authentication
Login → Token Verification → Profile Load → Preference Application → Session Management

For each journey:
- Create sequence diagrams
- Identify potential bottlenecks
- Define error recovery strategies
- Set performance benchmarks
- Specify caching opportunities
```

---

## 🏗️ Phase 2: Project Foundation & Setup

### Prompt 5: Monorepo Structure & Organization
```
Create a professional monorepo structure with clear separation of concerns:

```
geogemma/
├── .github/
│   ├── workflows/          # CI/CD pipelines
│   │   ├── frontend-deploy.yml
│   │   ├── backend-deploy.yml
│   │   └── test.yml
│   └── ISSUE_TEMPLATE/
├── frontend/
│   ├── public/
│   │   ├── assets/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── common/
│   │   │   ├── map/
│   │   │   ├── sidebars/
│   │   │   └── chat/
│   │   ├── contexts/       # React contexts for global state
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API clients and external services
│   │   ├── utils/          # Helper functions
│   │   ├── styles/         # Global styles and themes
│   │   ├── types/          # TypeScript type definitions
│   │   ├── config/         # App configuration
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── .env.example
│   ├── .eslintrc.js
│   ├── .prettierrc
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── routers/
│   │   │   ├── dependencies.py
│   │   │   └── __init__.py
│   │   ├── services/
│   │   │   ├── earth_engine_service.py
│   │   │   ├── gemini_service.py
│   │   │   ├── auth_service.py
│   │   │   └── cache_service.py
│   │   ├── models/
│   │   │   ├── database.py
│   │   │   └── schemas.py
│   │   ├── middleware/
│   │   │   ├── auth.py
│   │   │   ├── rate_limit.py
│   │   │   └── cors.py
│   │   ├── config/
│   │   │   ├── settings.py
│   │   │   └── logging.py
│   │   ├── utils/
│   │   └── __init__.py
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── conftest.py
│   ├── .env.example
│   ├── requirements.txt
│   ├── requirements-dev.txt
│   ├── pytest.ini
│   ├── app.py
│   └── Dockerfile
├── docs/
│   ├── api/
│   ├── architecture/
│   ├── deployment/
│   └── user-guide/
├── scripts/
│   ├── setup.sh
│   ├── deploy.sh
│   └── test.sh
├── docker-compose.yml
├── .gitignore
├── .env.example
├── README.md
└── LICENSE
```

Setup requirements:
- Professional README with badges
- Comprehensive .gitignore
- License selection
- Code of Conduct
- Contributing guidelines
- Security policy
```

### Prompt 6: Development Environment Setup Script
```
Create automated development environment setup scripts for both frontend and backend:

FRONTEND SETUP (setup-frontend.sh):
```bash
#!/bin/bash
echo "Setting up GeoGemma Frontend..."

# Check Node.js version
required_node_version="18"
current_node_version=$(node -v | cut -d'.' -f1 | sed 's/v//')

if [ "$current_node_version" -lt "$required_node_version" ]; then
    echo "Error: Node.js $required_node_version or higher required"
    exit 1
fi

# Install dependencies
cd frontend
npm install

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file. Please configure your environment variables."
fi

# Run initial build to verify setup
npm run build

echo "Frontend setup complete! Run 'npm run dev' to start development server."
```

BACKEND SETUP (setup-backend.sh):
```bash
#!/bin/bash
echo "Setting up GeoGemma Backend..."

# Check Python version
required_python_version="3.9"
current_python_version=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)

if [ "$(printf '%s\n' "$required_python_version" "$current_python_version" | sort -V | head -n1)" != "$required_python_version" ]; then
    echo "Error: Python $required_python_version or higher required"
    exit 1
fi

# Create virtual environment
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Created .env file. Please configure your environment variables."
fi

# Initialize Earth Engine authentication
echo "Initializing Earth Engine..."
earthengine authenticate

# Run tests to verify setup
pytest tests/

echo "Backend setup complete! Run 'python app.py' to start development server."
```

Also create:
- Windows PowerShell equivalents
- Docker development setup
- VS Code workspace settings
- Recommended extensions list
```

### Prompt 7: Environment Variables & Configuration Management
```
Design comprehensive environment variable management:

FRONTEND .env.example:
```
# API Configuration
VITE_API_URL=http://localhost:8000
VITE_API_TIMEOUT=30000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GEMINI_MODEL=gemini-pro

# Map Configuration
VITE_MAPBOX_TOKEN=your_mapbox_token
VITE_DEFAULT_MAP_CENTER_LAT=40.7128
VITE_DEFAULT_MAP_CENTER_LNG=-74.0060
VITE_DEFAULT_ZOOM_LEVEL=10

# Feature Flags
VITE_ENABLE_CHAT=true
VITE_ENABLE_TIME_SERIES=true
VITE_ENABLE_ANNOTATIONS=true

# Analytics
VITE_GA_TRACKING_ID=UA-XXXXX-Y
VITE_SENTRY_DSN=your_sentry_dsn

# Environment
VITE_APP_ENV=development
```

BACKEND .env.example:
```
# Server Configuration
HOST=0.0.0.0
PORT=8000
DEBUG=True
LOG_LEVEL=INFO
WORKERS=4

# Earth Engine Configuration
EE_PROJECT_ID=your_ee_project_id
EE_SERVICE_ACCOUNT=your_service_account@project.iam.gserviceaccount.com
EE_PRIVATE_KEY_PATH=./config/ee_service_account.json

# Gemini AI Configuration  
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-pro
GEMINI_TEMPERATURE=0.7
GEMINI_MAX_TOKENS=2048

# Firebase Configuration
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_PATH=./config/firebase_admin_sdk.json
FIREBASE_DATABASE_URL=https://your_project.firebaseio.com

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=
CACHE_TTL=3600

# Security
SECRET_KEY=generate_secure_random_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Rate Limiting
RATE_LIMIT_REQUESTS=60
RATE_LIMIT_WINDOW=60

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
CORS_ALLOW_CREDENTIALS=true

# Monitoring
SENTRY_DSN=your_sentry_dsn
ENABLE_METRICS=true

# Cloud Storage
GCS_BUCKET_NAME=your_bucket_name
```

Create configuration management utilities:
- Type-safe config loading
- Validation on startup
- Environment-specific configs
- Secrets management integration
```

---

## 🌍 Phase 3: GeoGemma Core Application

### Prompt 8: FastAPI Backend Foundation
```
Create a production-grade FastAPI backend with professional structure:

APP INITIALIZATION (app.py):
- FastAPI instance with metadata (title, description, version)
- API documentation configuration (Swagger UI, ReDoc)
- Custom OpenAPI schema
- Startup and shutdown event handlers
- Exception handlers for common errors
- CORS middleware configuration
- Rate limiting middleware
- Authentication middleware
- Request logging middleware
- Response compression

ROUTING STRUCTURE:
- `/api/v1/health` - Health check and readiness probes
- `/api/v1/layers` - Earth Engine layer operations
- `/api/v1/analysis` - Geospatial analysis endpoints
- `/api/v1/chat` - AI chat interface
- `/api/v1/auth` - Authentication operations
- `/api/v1/users` - User management
- `/api/v1/pixel-values` - Pixel inspection
- `/api/v1/annotations` - Drawing and annotations
- `/api/v1/exports` - Data export operations

ERROR HANDLING:
- Custom exception classes
- HTTP exception handlers
- Validation error formatters
- Rate limit exceeded responses
- Authentication error responses
- Earth Engine quota error handling

MIDDLEWARE STACK (in correct order):
1. CORS middleware
2. Request ID middleware
3. Logging middleware
4. Authentication middleware
5. Rate limiting middleware
6. Session middleware
7. Response compression

Include:
- Async/await best practices
- Type hints throughout  
- Pydantic models for request/response
- Dependency injection for services
- Background tasks for long operations
```

### Prompt 9: Google Earth Engine Service Implementation
```
Build a comprehensive Earth Engine service with professional error handling:

AUTHENTICATION & INITIALIZATION:
- Service account authentication
- Private key management
- Project ID configuration
- Retry logic for initialization
- Connection pool management
- Graceful degradation if EE unavailable

CORE IMAGE COLLECTIONS:
- Sentinel-2 (10m resolution, optical)
- Landsat 8/9 (30m resolution, optical with thermal)
- MODIS (250m-1km resolution, daily coverage)
- Sentinel-1 (SAR, all-weather)
- VIIRS (night lights, fires)
- Custom collection support

DATA PROCESSING FUNCTIONS:

1. RGB True Color:
```python
def generate_rgb_layer(location, date_range, collection="SENTINEL2"):
    """
    Generate RGB true color imagery with cloud masking.
    
    Args:
        location: GeoJSON geometry or place name
        date_range: tuple of (start_date, end_date)
        collection: Satellite collection name
    
    Returns:
        dict with tile_url, bounds, metadata
    """
    # Cloud masking
    # Temporal compositing
    # Visualization parameters
    # Tile URL generation
```

2. NDVI (Vegetation Index):
```python
def generate_ndvi_layer(location, date_range):
    """
    Calculate Normalized Difference Vegetation Index.
    NDVI = (NIR - Red) / (NIR + Red)
    
    Returns value range: -1 to 1
    - Water: < 0
    - Bare soil: 0.1-0.2
    - Sparse vegetation: 0.2-0.5
    - Dense vegetation: > 0.6
    """
```

3. Surface Water Detection:
- MNDWI (Modified Normalized Difference Water Index)
- NDWI (Normalized Difference Water Index)
- Water occurrence mapping
- Water extent changes

4. Land Surface Temperature:
- Landsat thermal bands
- MODIS LST products
- Temperature conversion (Kelvin to Celsius)
- Urban heat island analysis

5. Land Use/Land Cover:
- ESA WorldCover (10m)
- MODIS Land Cover (500m)
- Dynamic World (10m, near real-time)
- Custom classification

6. Building Footprints:
- Google Open Buildings dataset
- Height information
- Building density analysis
- Urban growth tracking

TILE GENERATION:
- getMapId() for tile URLs
- Authentication token management
- URL expiration handling
- Tile caching strategy
- Zoom level optimization

STATISTICS EXTRACTION:
- Reducer operations (mean, sum, std dev, min, max)
- Histogram generation
- Area calculations
- Pixel counting

ERROR HANDLING:
- Quota limit errors (graceful message)
- Timeout errors (retry logic)
- Invalid geometry errors
- Collection not found errors
- Processing errors with context

CACHING STRATEGY:
- Cache tile URLs (1 hour expiration)
- Cache statistics results
- LRU cache for frequent queries
- Redis integration for distributed caching

PERFORMANCE OPTIMIZATION:
- Batch tile requests
- Optimize filter predicates
- Use ee.ImageCollection.mosaic() wisely
- Limit image collection size
- Scale-appropriate processing
```

### Prompt 10: Natural Language Query Parser with Gemini
```
Implement an intelligent NLP query parser using Google Gemini AI:

PARSER ARCHITECTURE:
```python
class QueryParser:
    def __init__(self, gemini_api_key):
        self.client = genai.configure(api_key=gemini_api_key)
        self.model = genai.GenerativeModel('gemini-pro')
    
    async def parse_query(self, user_query: str, context: dict = None) -> QueryStructure:
        """
        Parse natural language into structured query parameters.
        
        Returns:
            QueryStructure with:
            - location: str or coordinates
            - data_type: str (rgb, ndvi, water, temperature, etc.)
            - date_range: tuple (start, end) or relative (last_month, 2023, etc.)
            - satellite: str (sentinel2, landsat8, etc.)
            - analysis_type: str (single, comparison, timeseries)
            - additional_params: dict
        """
```

INTENT RECOGNITION:
Identify query types:
- Single layer request: "Show NDVI in Paris"
- Comparison request: "Compare water in 2020 vs 2024"
- Time series: "Track deforestation over 5 years"
- Analysis request: "Analyze urban heat island effect"
- Information request: "What is NDVI?"
- Location request: "Where is the Amazon rainforest?"

LOCATION EXTRACTION:
- City names: "Paris", "Tokyo", "New York"
- Landmarks: "Grand Canyon", "Mount Everest"
- Countries: "Brazil", "India"
- Administrative regions: "California", "Siberia"  
- Coordinates: "40.7°N, 74.0°W" or "40.7, -74.0"
- Bounding boxes: "between 40,74 and 41,75"
- Relative: "here", "current view"

DATE PARSING:
- Absolute: "2023-01-01", "January 2023", "2023"
- Relative: "last month", "last year", "yesterday", "summer 2023"
- Ranges: "from 2020 to 2024", "January through March 2023"
- Seasons: "summer 2023", "Q1 2024"

DATA TYPE MAPPING:
- "vegetation" → NDVI
- "greenness" → NDVI
- "water" → MNDWI/NDWI
- "temperature" → Land Surface Temperature
- "heat" → LST
- "buildings" → Open Buildings
- "urban" → LULC urban classification
- "forest", "trees" → NDVI + LULC forest
- "clouds" → Cloud probability

GEMINI PROMPT ENGINEERING:
```
System: You are an expert geospatial query parser. Extract structured information from natural language 
queries about Earth observation data.

User Query: {user_query}
Current Context: {current_location, current_date_range, active_layers}

Extract and return JSON:
{
  "location": {
    "name": "Paris",
    "coordinates": [48.8566, 2.3522],
    "type": "city",
    "bounds": [[48.8, 2.2], [48.9, 2.4]]
  },
  "data_type": "ndvi",
  "date_range": {
    "start": "2023-06-01",
    "end": "2023-08-31",
    "description": "summer 2023"
  },
  "satellite": "sentinel2",
  "analysis_type": "single",
  "confidence": 0.95,
  "ambiguities": []
}

If ambiguous, include clarifying questions in "ambiguities" array.
```

GEOCODING FALLBACK:
- Nominatim (OpenStreetMap)
- Google Geocoding API  
- Mapbox Geocoding
- Cache geocoding results

CONFIDENCE SCORING:
- High confidence (>0.9): Execute automatically
- Medium confidence (0.7-0.9): Show interpretation, ask confirmation
- Low confidence (<0.7): Ask clarifying questions

CONTEXT AWARENESS:
- Remember previous queries in session
- Reference "same area" or "here"
- Understand "zoom in" or "zoom out"
- Handle "compare with last year"

EXAMPLE QUERIES TO HANDLE:
1. "Show me NDVI in Paris for summer 2023"
2. "What's the temperature in Tokyo right now?"
3. "Compare water levels in Lake Mead between 2020 and 2024"
4. "Track deforestation in the Amazon over 5 years"
5. "Building density in Manhattan"
6. "Show Landsat 8 RGB of volcano in Hawaii"
7. "Urban heat islands in Phoenix, Arizona"
8. "Crop health in Iowa corn belt"
9. "Snow cover in the Alps this winter vs last winter"
10. "Air quality (NO2) in Los Angeles"
```

### Prompt 11: Layer Generation System
```
Create a sophisticated layer generation system with factory pattern:

BASE LAYER CLASS:
```python
from abc import ABC, abstractmethod
from enum import Enum

class LayerType(Enum):
    RGB = "rgb"
    NDVI = "ndvi"
    WATER = "water"
    TEMPERATURE = "temperature"
    LULC = "land_use"
    BUILDINGS = "buildings"

class BaseLayer(ABC):
    def __init__(self, location, date_range, params=None):
        self.location = location
        self.date_range = date_range
        self.params = params or {}
        self.tile_url = None
        self.metadata = {}
        self.statistics = {}
    
    @abstractmethod
    async def generate(self) -> dict:
        """Generate the layer and return metadata"""
        pass
    
    @abstractmethod
    def get_visualization_params(self) -> dict:
        """Return EE visualization parameters"""
        pass
    
    @abstractmethod
    def get_legend_info(self) -> dict:
        """Return legend configuration"""
        pass
    
    async def calculate_statistics(self) -> dict:
        """Calculate layer statistics"""
        pass
    
    def get_metadata(self) -> dict:
        """Return comprehensive metadata"""
        return {
            "layer_type": self.layer_type.value,
            "location": self.location,
            "date_range": self.date_range,
            "tile_url": self.tile_url,
            "statistics": self.statistics,
            "legend": self.get_legend_info(),
            "data_source": self.get_data_source(),
            "resolution": self.get_resolution(),
            "timestamp": datetime.utcnow().isoformat()
        }
```

CONCRETE IMPLEMENTATIONS:

```python
class RGBLayer(BaseLayer):
    layer_type = LayerType.RGB
    
    def get_visualization_params(self):
        return {
            'bands': ['B4', 'B3', 'B2'],
            'min': 0,
            'max': 3000,
            'gamma': 1.4
        }
    
    async def generate(self):
        # Cloud masking
        collection = ee.ImageCollection('COPERNICUS/S2_SR')
        filtered = collection.filterBounds(self.location) \
                            .filterDate(*self.date_range) \
                            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
        
        # Median composite
        image = filtered.median()
        
        # Generate tiles
        map_id = image.getMapId(self.get_visualization_params())
        self.tile_url = map_id['tile_fetcher'].url_format
        
        # Calculate statistics
        self.statistics = await self.calculate_statistics()
        
        return self.get_metadata()

class NDVILayer(BaseLayer):
    layer_type = LayerType.NDVI
    
    def get_visualization_params(self):
        return {
            'min': -1,
            'max': 1,
            'palette': [
                '#d73027',  # -1 (water)
                '#fee08b',  # 0 (bare soil)
                '#d9ef8b',  # 0.2 (sparse vegetation)
                '#66bd63',  # 0.5 (moderate vegetation)
                '#1a9850'   # 1 (dense vegetation)
            ]
        }
    
    def get_legend_info(self):
        return {
            'type': 'gradient',
            'title': 'NDVI (Vegetation Index)',
            'min': -1,
            'max': 1,
            'stops': [
                {'value': -1, 'color': '#d73027', 'label': 'Water'},
                {'value': 0, 'color': '#fee08b', 'label': 'Bare Soil'},
                {'value': 0.2, 'color': '#d9ef8b', 'label': 'Sparse Veg'},
                {'value': 0.5, 'color': '#66bd63', 'label': 'Moderate Veg'},
                {'value': 1, 'color': '#1a9850', 'label': 'Dense Veg'}
            ]
        }
    
    async def generate(self):
        collection = ee.ImageCollection('COPERNICUS/S2_SR')
        filtered = collection.filterBounds(self.location) \
                            .filterDate(*self.date_range) \
                            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
        
        # Calculate NDVI
        def add_ndvi(image):
            ndvi = image.normalizedDifference(['B8', 'B5']).rename('NDVI')
            return image.addBands(ndvi)
        
        with_ndvi = filtered.map(add_ndvi)
        ndvi_composite = with_ndvi.select('NDVI').median()
        
        # Generate tiles
        map_id = ndvi_composite.getMapId(self.get_visualization_params())
        self.tile_url = map_id['tile_fetcher'].url_format
        
        # Statistics
        stats = ndvi_composite.reduceRegion(
            reducer=ee.Reducer.mean().combine(
                ee.Reducer.stdDev(), '', True
            ).combine(
                ee.Reducer.minMax(), '', True
            ),
            geometry=self.location,
            scale=10,
            maxPixels=1e9
        ).getInfo()
        
        self.statistics = stats
        
        return self.get_metadata()
```

LAYER FACTORY:
```python
class LayerFactory:
    _layer_classes = {
        LayerType.RGB: RGBLayer,
        LayerType.NDVI: NDVILayer,
        LayerType.WATER: WaterLayer,
        LayerType.TEMPERATURE: TemperatureLayer,
        LayerType.LULC: LandUsLayer,
        LayerType.BUILDINGS: BuildingsLayer,
    }
    
    @classmethod
    def create_layer(cls, layer_type: LayerType, **kwargs) -> BaseLayer:
        layer_class = cls._layer_classes.get(layer_type)
        if not layer_class:
            raise ValueError(f"Unknown layer type: {layer_type}")
        return layer_class(**kwargs)
    
    @classmethod
    async def generate_layer(cls, layer_type: LayerType, **kwargs) -> dict:
        layer = cls.create_layer(layer_type, **kwargs)
        return await layer.generate()
```

API ENDPOINT:
```python
@router.post("/api/v1/layers/generate")
async def generate_layer(request: LayerRequest):
    """
    Generate Earth Engine layer from query parameters.
    """
    try:
        layer_type = LayerType(request.data_type)
        metadata = await LayerFactory.generate_layer(
            layer_type=layer_type,
            location=request.location,
            date_range=(request.start_date, request.end_date),
            params=request.additional_params
        )
        return {"status": "success", "data": metadata}
    except Exception as e:
        logger.error(f"Layer generation failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))
```

CACHING STRATEGY:
- Cache tile URLs (1 hour TTL)
- Cache statistics (6 hours TTL)
- Cache by hash of (location, date_range, layer_type)
- Redis for distributed caching
- Local memory cache for hot data
```

### Prompt 12: Pixel Value Inspector Service
```
Build a comprehensive pixel inspection service for detailed analysis:

SERVICE IMPLEMENTATION:
```python
class PixelInspectorService:
    def __init__(self, ee_service):
        self.ee = ee_service
        self.geocoder = Nominatim(user_agent="geogemma")
    
    async def inspect_pixel(
        self,
        lat: float,
        lon: float,
        layers: List[str],
        date: str = None
    ) -> dict:
        """
        Extract pixel values at coordinates for multiple layers.
        
        Args:
            lat: Latitude
            lon: Longitude
            layers: List of layer IDs or types
            date: Optional specific date (default: most recent)
        
        Returns:
            dict with pixel values, interpretations, and metadata
        """
        point = ee.Geometry.Point([lon, lat])
        
        results = {
            "coordinates": {"lat": lat, "lon": lon},
            "location_info": await self.get_location_info(lat, lon),
            "layers": {}
        }
        
        for layer_type in layers:
            layer_data = await self.extract_layer_value(point, layer_type, date)
            results["layers"][layer_type] = layer_data
        
        return results
    
    async def extract_layer_value(self, point, layer_type, date):
        """Extract value for specific layer"""
        if layer_type == "rgb":
            return await self._extract_rgb(point, date)
        elif layer_type == "ndvi":
            return await self._extract_ndvi(point, date)
        elif layer_type == "temperature":
            return await self._extract_temperature(point, date)
        elif layer_type == "elevation":
            return await self._extract_elevation(point)
        else:
            raise ValueError(f"Unknown layer type: {layer_type}")
    
    async def _extract_ndvi(self, point, date):
        """Extract NDVI value with interpretation"""
        collection = ee.ImageCollection('COPERNICUS/S2_SR')
        
        if date:
            start = date
            end = (datetime.fromisoformat(date) + timedelta(days=1)).isoformat()
        else:
            end = datetime.now().isoformat()
            start = (datetime.now() - timedelta(days=30)).isoformat()
        
        image = collection.filterBounds(point) \
                         .filterDate(start, end) \
                         .first()
        
        ndvi = image.normalizedDifference(['B8', 'B5'])
        
        value = ndvi.reduceRegion(
            reducer=ee.Reducer.first(),
            geometry=point,
            scale=10
        ).get('nd').getInfo()
        
        interpretation = self._interpret_ndvi(value)
        
        return {
            "value": round(value, 3),
            "interpretation": interpretation,
            "unit": "index",
            "range": "-1 to 1",
            "acquisition_date": image.get('system:time_start').getInfo(),
            "satellite": "Sentinel-2",
            "quality": self._get_pixel_quality(image, point)
        }
    
    def _interpret_ndvi(self, value):
        """Provide human-readable interpretation"""
        if value < 0:
            return "Water body or very wet surface"
        elif value < 0.1:
            return "Bare soil or rock"
        elif value < 0.2:
            return "Very sparse vegetation"
        elif value < 0.3:
            return "Sparse to moderate vegetation"
        elif value < 0.5:
            return "Moderate vegetation"
        elif value < 0.7:
            return "Dense vegetation"
        else:
            return "Very dense vegetation (forest)"
    
    async def get_location_info(self, lat, lon):
        """Get human-readable location information"""
        try:
            location = await self.geocoder.reverse(f"{lat}, {lon}")
            address = location.raw.get('address', {})
            
            return {
                "place_name": location.address,
                "city": address.get('city') or address.get('town'),
                "state": address.get('state'),
                "country": address.get('country'),
                "country_code": address.get('country_code'),
                "timezone": self._get_timezone(lat, lon)
            }
        except Exception as e:
            logger.warning(f"Reverse geocoding failed: {e}")
            return {"error": "Location info unavailable"}
    
    async def get_time_series(
        self,
        lat: float,
        lon: float,
        layer_type: str,
        start_date: str,
        end_date: str,
        interval: str = "monthly"
    ) -> dict:
        """Get time series of pixel values"""
        point = ee.Geometry.Point([lon, lat])
        
        # Generate time intervals
        intervals = self._generate_intervals(start_date, end_date, interval)
        
        time_series = []
        for interval_start, interval_end in intervals:
            value = await self.extract_layer_value(
                point,
                layer_type,
                interval_start
            )
            time_series.append({
                "date": interval_start,
                "value": value.get("value"),
                "interpretation": value.get("interpretation")
            })
        
        return {
            "layer_type": layer_type,
            "coordinates": {"lat": lat, "lon": lon},
            "date_range": {"start": start_date, "end": end_date},
            "interval": interval,
            "time_series": time_series,
            "statistics": self._calculate_ts_statistics(time_series),
            "trend": self._calculate_trend(time_series)
        }
```

API ENDPOINTS:
```python
@router.post("/api/v1/pixel-values/inspect")
async def inspect_pixel(request: PixelInspectRequest):
    """Get pixel values at coordinates"""
    service = PixelInspectorService(ee_service)
    result = await service.inspect_pixel(
        lat=request.lat,
        lon=request.lon,
        layers=request.layers,
        date=request.date
    )
    return result

@router.post("/api/v1/pixel-values/time-series")
async def get_time_series(request: TimeSeriesRequest):
    """Get time series for pixel location"""
    service = PixelInspectorService(ee_service)
    result = await service.get_time_series(
        lat=request.lat,
        lon=request.lon,
        layer_type=request.layer_type,
        start_date=request.start_date,
        end_date=request.end_date,
        interval=request.interval
    )
    return result
```

Include:
- Caching for recent inspections
- Batch pixel requests
- Export to CSV/JSON
- Chart generation for time series
```

### Prompt 13: FastAPI Middleware Stack
```
Implement comprehensive middleware stack with proper ordering:

1. RATE LIMITING MIDDLEWARE:
```python
from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
import time
from collections import defaultdict

class RateLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, requests_per_minute=60):
        super().__init__(app)
        self.requests_per_minute = requests_per_minute
        self.requests = defaultdict(list)
    
    async def dispatch(self, request: Request, call_next):
        # Get client identifier (IP or user ID)
        client_id = request.client.host
        if request.user.is_authenticated:
            client_id = request.user.id
        
        # Clean old requests
        now = time.time()
        self.requests[client_id] = [
            req_time for req_time in self.requests[client_id]
            if now - req_time < 60
        ]
        
        # Check rate limit
        if len(self.requests[client_id]) >= self.requests_per_minute:
            raise HTTPException(
                status_code=429,
                detail=f"Rate limit exceeded. Max {self.requests_per_minute} requests per minute.",
                headers={"Retry-After": "60"}
            )
        
        # Record request
        self.requests[client_id].append(now)
        
        response = await call_next(request)
        response.headers["X-Rate-Limit-Limit"] = str(self.requests_per_minute)
        response.headers["X-Rate-Limit-Remaining"] = str(
            self.requests_per_minute - len(self.requests[client_id])
        )
        return response
```

2. REQUEST LOGGING MIDDLEWARE:
```python
import uuid
import time
import logging

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Generate request ID
        request_id = str(uuid.uuid4())
        request.state.request_id = request_id
        
        # Log request
        logger.info(f"Request started", extra={
            "request_id": request_id,
            "method": request.method,
            "path": request.url.path,
            "client": request.client.host,
            "user_agent": request.headers.get("user-agent")
        })
        
        start_time = time.time()
        
        try:
            response = await call_next(request)
            process_time = time.time() - start_time
            
            # Log response
            logger.info(f"Request completed", extra={
                "request_id": request_id,
                "status_code": response.status_code,
                "process_time": f"{process_time:.3f}s"
            })
            
            response.headers["X-Request-ID"] = request_id
            response.headers["X-Process-Time"] = f"{process_time:.3f}"
            
            return response
        
        except Exception as e:
            logger.error(f"Request failed", extra={
                "request_id": request_id,
                "error": str(e)
            }, exc_info=True)
            raise
```

3. FIREBASE AUTH MIDDLEWARE:
```python
from firebase_admin import auth

class FirebaseAuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, public_paths=None):
        super().__init__(app)
        self.public_paths = public_paths or []
    
    async def dispatch(self, request: Request, call_next):
        # Skip auth for public paths
        if any(request.url.path.startswith(path) for path in self.public_paths):
            return await call_next(request)
        
        # Extract token from Authorization header
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            raise HTTPException(
                status_code=401,
                detail="Missing or invalid authorization header"
            )
        
        token = auth_header.split("Bearer ")[1]
        
        try:
            # Verify token
            decoded_token = auth.verify_id_token(token)
            request.state.user = decoded_token
            request.state.user_id = decoded_token['uid']
            
            response = await call_next(request)
            return response
        
        except auth.InvalidIdTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
        except auth.ExpiredIdTokenError:
            raise HTTPException(status_code=401, detail="Token expired")
        except Exception as e:
            logger.error(f"Authentication error: {e}")
            raise HTTPException(status_code=401, detail="Authentication failed")
```

4. ERROR HANDLER MIDDLEWARE:
```python
from fastapi.responses import JSONResponse

class ErrorHandlerMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            return await call_next(request)
        except HTTPException:
            raise  # Let FastAPI handle HTTP exceptions
        except ee.EEException as e:
            logger.error(f"Earth Engine error: {e}")
            return JSONResponse(
                status_code=503,
                content={
                    "error": "Earth Engine service error",
                    "detail": str(e),
                    "type": "earth_engine_error"
                }
            )
        except Exception as e:
            logger.error(f"Unexpected error: {e}", exc_info=True)
            return JSONResponse(
                status_code=500,
                content={
                    "error": "Internal server error",
                    "detail": str(e) if settings.DEBUG else "An error occurred",
                    "type": "internal_error",
                    "request_id": getattr(request.state, 'request_id', None)
                }
            )
```

MIDDLEWARE REGISTRATION ORDER:
```python
# app.py
# Order matters! Apply in this sequence:

# 1. CORS (must be first)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# 2. Error handling
app.add_middleware(ErrorHandlerMiddleware)

# 3. Request logging
app.add_middleware(RequestLoggingMiddleware)

# 4. Authentication
app.add_middleware(
    FirebaseAuthMiddleware,
    public_paths=["/api/health", "/api/docs", "/api/openapi.json"]
)

# 5. Rate limiting
app.add_middleware(RateLimitMiddleware, requests_per_minute=60)

# 6. Session management
app.add_middleware(
    SessionMiddleware,
    secret_key=settings.secret_key
)

# 7. Compression (last)
app.add_middleware(GZipMiddleware, minimum_size=1000)
```
```

---

## 🎨 Phase 4: Frontend Implementation

### Prompt 14: React Application with Vite
```
Initialize modern React application with Vite:

PROJECT SETUP:
```bash
npm create vite@latest geogemma-frontend -- --template react
cd geogemma-frontend
npm install
```

INSTALL DEPENDENCIES:
```bash
# Core dependencies
npm install react-router-dom maplibre-gl axios

# UI and styling
npm install tailwindcss postcss autoprefixer
npm install @heroicons/react lucide-react
npm install react-toastify react-loading-skeleton

# State management and utilities
npm install date-fns lodash

# Firebase
npm install firebase

# Development dependencies
npm install -D @types/react @types/node
npm install -D eslint eslint-plugin-react
npm install -D prettier eslint-config-prettier
```

VITE CONFIGURATION (vite.config.js):
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@services': path.resolve(__dirname, './src/services'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'map-vendor': ['maplibre-gl'],
          'firebase-vendor': ['firebase/app', 'firebase/auth', 'firebase/firestore'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'maplibre-gl'],
  },
})
```

TAILWIND CONFIGURATION:
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f2ff',
          500: '#3b82f6',
          700: '#1d4ed8',
        },
        earth: {
          blue: '#2563eb',
          green: '#10b981',
          brown: '#92400e',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-in': 'slideIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
```
```

### Prompt 15: MapLibre GL JS Integration
```
Integrate MapLibre GL JS for high-performance mapping:

MAP COMPONENT (components/map/MapContainer.jsx):
```javascript
import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useMap } from '@contexts/MapContext'

const MapContainer = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const { state, dispatch } = useMap()
  
  useEffect(() => {
    if (map.current) return // Initialize map only once
    
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: state.mapStyle || 'https://api.maptiler.com/maps/satellite/style.json?key=YOUR_KEY',
      center: [state.center.lng, state.center.lat],
      zoom: state.zoom,
      pitch: 0,
      bearing: 0,
      antialias: true,
    })
    
    // Add navigation controls
    map.current.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true,
      }),
      'top-right'
    )
    
    // Add scale control
    map.current.addControl(
      new maplibregl.ScaleControl({
        maxWidth: 200,
        unit: 'metric',
      }),
      'bottom-left'
    )
    
    // Add geolocate control
    map.current.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      'top-right'
    )
    
    // Event listeners
    map.current.on('moveend', () => {
      const center = map.current.getCenter()
      const zoom = map.current.getZoom()
      dispatch({ type: 'UPDATE_VIEW', payload: { center, zoom } })
    })
    
    map.current.on('click', (e) => {
      dispatch({ 
        type: 'MAP_CLICK', 
        payload: { 
          lat: e.lngLat.lat, 
          lng: e.lngLat.lng 
        } 
      })
    })
    
    // Store map instance in context
    dispatch({ type: 'SET_MAP_INSTANCE', payload: map.current })
    
    return () => map.current.remove()
  }, [])
  
  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      <CoordinateDisplay />
    </div>
  )
}
```

MAP CONTEXT (contexts/MapContext.jsx):
```javascript
import { createContext, useContext, useReducer } from 'react'

const MapContext = createContext()

const initialState = {
  mapInstance: null,
  center: { lat: 40.7128, lng: -74.0060 },
  zoom: 10,
  mapStyle: 'satellite',
  layers: [],
  selectedPoint: null,
  drawMode: false,
}

function mapReducer(state, action) {
  switch (action.type) {
    case 'SET_MAP_INSTANCE':
      return { ...state, mapInstance: action.payload }
    case 'UPDATE_VIEW':
      return { ...state, ...action.payload }
    case 'ADD_LAYER':
      return { ...state, layers: [...state.layers, action.payload] }
    case 'REMOVE_LAYER':
      return { ...state, layers: state.layers.filter(l => l.id !== action.payload) }
    case 'UPDATE_LAYER':
      return {
        ...state,
        layers: state.layers.map(l =>
          l.id === action.payload.id ? { ...l, ...action.payload.updates } : l
        ),
      }
    case 'SET_MAP_STYLE':
      return { ...state, mapStyle: action.payload }
    case 'MAP_CLICK':
      return { ...state, selectedPoint: action.payload }
    default:
      return state
  }
}

export function MapProvider({ children }) {
  const [state, dispatch] = useReducer(mapReducer, initialState)
  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  )
}

export function useMap() {
  const context = useContext(MapContext)
  if (!context) throw new Error('useMap must be used within MapProvider')
  return context
}
```

LAYER MANAGEMENT:
```javascript
// Add Earth Engine tile layer
function addEETileLayer(map, layerData) {
  const layerId = layerData.id
  
  map.addSource(layerId, {
    type: 'raster',
    tiles: [layerData.tileUrl],
    tileSize: 256,
    maxzoom: 14,
  })
  
  map.addLayer({
    id: layerId,
    type: 'raster',
    source: layerId,
    paint: {
      'raster-opacity': layerData.opacity || 1,
      'raster-fade-duration': 300,
    },
  })
}

// Update layer opacity
function updateLayerOpacity(map, layerId, opacity) {
  map.setPaintProperty(layerId, 'raster-opacity', opacity)
}

// Remove layer
function removeLayer(map, layerId) {
  if (map.getLayer(layerId)) {
    map.removeLayer(layerId)
  }
  if (map.getSource(layerId)) {
    map.removeSource(layerId)
  }
}
```
```

### Prompt 16: Map Theme Switcher 
```
Implement satellite and dark mode map themes:

MAP STYLES CONFIGURATION:
```javascript
// config/mapStyles.js
export const MAP_STYLES = {
  satellite: {
    id: 'satellite',
    name: 'Satellite',
    url: 'https://api.maptiler.com/maps/satellite/style.json?key=YOUR_KEY',
    icon: '🛰️',
  },
  hybrid: {
    id: 'hybrid',
    name: 'Hybrid',
    url: 'https://api.maptiler.com/maps/hybrid/style.json?key=YOUR_KEY',
    icon: '🗺️',
  },
  streets: {
    id: 'streets',
    name: 'Streets',
    url: 'https://api.maptiler.com/maps/streets/style.json?key=YOUR_KEY',
    icon: '🏙️',
  },
  dark: {
    id: 'dark',
    name: 'Dark',
    url: 'https://api.maptiler.com/maps/dark/style.json?key=YOUR_KEY',
    icon: '🌙',
  },
  terrain: {
    id: 'terrain',
    name: 'Terrain',
    url: 'https://api.maptiler.com/maps/terrain/style.json?key=YOUR_KEY',
    icon: '⛰️',
  },
}
```

THEME SWITCHER COMPONENT:
```javascript
// components/map/MapStyleSwitcher.jsx
import { useState } from 'react'
import { MAP_STYLES } from '@/config/mapStyles'
import { useMap } from '@contexts/MapContext'

const MapStyleSwitcher = () => {
  const { state, dispatch } = useMap()
  const [isOpen, setIsOpen] = useState(false)
  
  const changeMapStyle = (styleId) => {
    const style = MAP_STYLES[styleId]
    if (state.mapInstance) {
      // Preserve layers when changing style
      const layers = state.layers
      
      state.mapInstance.setStyle(style.url)
      
      // Re-add layers after style is loaded
      state.mapInstance.once('styledata', () => {
        layers.forEach(layer => {
          addEETileLayer(state.mapInstance, layer)
        })
      })
      
      dispatch({ type: 'SET_MAP_STYLE', payload: styleId })
      setIsOpen(false)
    }
  }
  
  const currentStyle = MAP_STYLES[state.mapStyle]
  
  return (
    <div className="absolute top-4 right-4 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50"
      >
        <span>{currentStyle.icon}</span>
        <span className="font-medium">{currentStyle.name}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
          {Object.values(MAP_STYLES).map(style => (
            <button
              key={style.id}
              onClick={() => changeMapStyle(style.id)}
              className={`w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100 ${
                state.mapStyle === style.id ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <span>{style.icon}</span>
              <span>{style.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```
```

### Prompt 17: Layers Sidebar Component
```
Build comprehensive layers management sidebar:

LAYERS SIDEBAR (components/sidebars/LayersSidebar.jsx):
```javascript
import { useState } from 'react'
import { useMap } from '@contexts/MapContext'
import { TrashIcon, EyeIcon, EyeSlashIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

const LayersSidebar = ({ isOpen, onClose }) => {
  const { state, dispatch } = useMap()
  const [expandedLayer, setExpandedLayer] = useState(null)
  
  const updateOpacity = (layerId, opacity) => {
    dispatch({
      type: 'UPDATE_LAYER',
      payload: { id: layerId, updates: { opacity: opacity / 100 } },
    })
    
    if (state.mapInstance) {
      updateLayerOpacity(state.mapInstance, layerId, opacity / 100)
    }
  }
  
  const toggleVisibility = (layerId) => {
    const layer = state.layers.find(l => l.id === layerId)
    const newVisibility = !layer.visible
    
    dispatch({
      type: 'UPDATE_LAYER',
      payload: { id: layerId, updates: { visible: newVisibility } },
    })
    
    if (state.mapInstance) {
      state.mapInstance.setLayoutProperty(
        layerId,
        'visibility',
        newVisibility ? 'visible' : 'none'
      )
    }
  }
  
  const deleteLayer = (layerId) => {
    dispatch({ type: 'REMOVE_LAYER', payload: layerId })
    if (state.mapInstance) {
      removeLayer(state.mapInstance, layerId)
    }
  }
  
  return (
    <div
      className={`fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-20 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Layers</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Layers List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {state.layers.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>No layers added yet</p>
              <p className="text-sm mt-2">Use the search or chat to add layers</p>
            </div>
          ) : (
            state.layers.map(layer => (
              <LayerCard
                key={layer.id}
                layer={layer}
                isExpanded={expandedLayer === layer.id}
                onExpand={() => setExpandedLayer(expandedLayer === layer.id ? null : layer.id)}
                onUpdateOpacity={updateOpacity}
                onToggleVisibility={toggleVisibility}
                onDelete={deleteLayer}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

const LayerCard = ({ 
  layer, 
  isExpanded, 
  onExpand, 
  onUpdateOpacity, 
  onToggleVisibility, 
  onDelete 
}) => {
  const opacity = Math.round((layer.opacity || 1) * 100)
  
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
      {/* Layer Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-medium text-sm">{layer.name || layer.layerType}</h3>
          <p className="text-xs text-gray-500">{layer.satellite || 'Sentinel-2'}</p>
          {layer.dateRange && (
            <p className="text-xs text-gray-400">
              {layer.dateRange.start} to {layer.dateRange.end}
            </p>
          )}
        </div>
        
        <div className="flex gap-1">
          <button
            onClick={() => onToggleVisibility(layer.id)}
            className="p-1.5 hover:bg-gray-200 rounded"
            title={layer.visible ? 'Hide layer' : 'Show layer'}
          >
            {layer.visible ? (
              <EyeIcon className="w-4 h-4" />
            ) : (
              <EyeSlashIcon className="w-4 h-4 text-gray-400" />
            )}
          </button>
          <button
            onClick={() => onDelete(layer.id)}
            className="p-1.5 hover:bg-red-100 rounded text-red-600"
            title="Delete layer"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Opacity Slider */}
      <div className="mb-2">
        <label className="text-xs text-gray-600 mb-1 block">
          Opacity: {opacity}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={opacity}
          onChange={(e) => onUpdateOpacity(layer.id, parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      {/* Expand for Details */}
      <button
        onClick={onExpand}
        className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
      >
        {isExpanded ? 'Hide' : 'Show'} details
        <svg
          className={`w-3 h-3 transform transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-200 text-xs space-y-2">
          {layer.metadata && (
            <>
              <div>
                <span className="font-medium">Resolution:</span> {layer.metadata.resolution}
              </div>
              {layer.statistics && (
                <div>
                  <span className="font-medium">Stats:</span>
                  <div className="ml-2 text-gray-600">
                    Mean: {layer.statistics.mean?.toFixed(3)}<br />
                    Min: {layer.statistics.min?.toFixed(3)}<br />
                    Max: {layer.statistics.max?.toFixed(3)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default LayersSidebar
```
```

---

## 💬 Phase 5: GeoGemma Chat & AI Integration

### Prompt 18: Inspection Sidebar Implementation
```
Build pixel inspection sidebar for detailed analysis:

INSPECT SIDEBAR (components/sidebars/InspectSidebar.jsx):

COMPLETE IMPLEMENTATION with:
- Click-to-inspect mode toggle
- Display pixel values for all layers
- Reverse geocoding for location info
- Time series chart for selected point
- Export functionality
- Coordinate display and copy
- Elevation data
- Formatted values with units
```

### Prompt 19: Metadata Sidebar
```
Create metadata sidebar showing dataset information:

METADATA SIDEBAR with sections:
- Dataset overview and description
- Technical specifications
- Spatial/temporal resolution
- Spectral bands information
- Data quality metrics
- Usage guidelines
- Citation and licensing
- Links to documentation
```

### Prompt 20: Search Bar Component  
```
Implement intelligent location search:

SEARCH BAR (components/SearchBar.jsx):
- Geocoding integration (Nominatim/Google Places)
- Autocomplete suggestions
- Search history
- Recent locations
- Coordinates support
- Bounding box support
- Keyboard navigation
- Results ranking
- Error handling
```

### Prompt 21: Natural Language Prompt Bar
```
Create AI-powered prompt bar:

PROMPT BAR (components/PromptBar.jsx):
- Natural language input
- Example prompts
- Query history
- Auto-execution on high confidence
- Clarifying questions UI
- Loading states
- Error handling
- Voice input (optional)
- Integration with Gemini NLP
```

### Prompt 22: Annotation Tools
```
Implement drawing and measurement tools:

ANNOTATION TOOLS:
- Point markers
- Line/polyline drawing
- Polygon drawing
- Rectangle selection
- Circle drawing
- Distance measurement
- Area calculation
- Text labels
- Color picker
- Edit/delete functionality
- GeoJSON export/import
- Save to Firestore
```

---

## 💬 Phase 6: GeoGemma Chat with Gemini AI

### Prompt 23: Gemini Chat Integration
```
Build intelligent chat interface powered by Google Gemini:

GEMINI SERVICE (services/geminiService.js):
```javascript
import { GoogleGenerativeAI } from '@google/generative-ai'

class GeminiService {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' })
    this.chatHistory = []
  }
  
  async sendMessage(message, context = {}) {
    // Build context-aware prompt
    const systemContext = this.buildSystemContext(context)
    const fullPrompt = `${systemContext}\n\nUser: ${message}`
    
    try {
      const result = await this.model.generateContent(fullPrompt)
      const response = result.response
      const text = response.text()
      
      // Store in history
      this.chatHistory.push(
        { role: 'user', content: message },
        { role: 'assistant', content: text }
      )
      
      // Parse for actions
      const actions = this.parseActions(text)
      
      return {
        text,
        actions,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      console.error('Gemini API error:', error)
      throw error
    }
  }
  
  buildSystemContext(context) {
    const parts = [
      'You are GeoGemma AI, an expert assistant for Earth observation and geospatial analysis.',
      'Help users understand satellite imagery, explain geospatial concepts, and guide analysis.',
    ]
    
    if (context.currentLocation) {
      parts.push(`Current map location: ${context.currentLocation.name}`)
    }
    
    if (context.activeLayers?.length > 0) {
      parts.push(`Active layers: ${context.activeLayers.map(l => l.type).join(', ')}`)
    }
    
    if (context.recentQuery) {
      parts.push(`Recent query: ${context.recentQuery}`)
    }
    
    return parts.join('\n')
  }
  
  parseActions(text) {
    const actions = []
    
    // Detect if AI wants to show a layer
    if (text.match(/show.*(?:ndvi|rgb|temperature|water)/i)) {
      // Extract layer type and parameters
      actions.push({ type: 'ADD_LAYER', params: {} })
    }
    
    // Detect zoom/pan requests
    if (text.match(/zoom to|navigate to|go to/i)) {
      actions.push({ type: 'NAVIGATE', params: {} })
    }
    
    return actions
  }
}
```

CHAT INTERFACE (components/chat/ChatInterface.jsx):
```javascript
import { useState, useRef, useEffect } from 'react'
import { useMap } from '@contexts/MapContext'
import { geminiService } from '@services/geminiService'

const ChatInterface = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const { state } = useMap()
  
  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    
    try {
      // Build context from current map state
      const context = {
        currentLocation: state.selectedPoint,
        activeLayers: state.layers,
        mapBounds: state.mapInstance?.getBounds(),
      }
      
      const response = await geminiService.sendMessage(input, context)
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
        actions: response.actions,
      }
      
      setMessages(prev => [...prev, aiMessage])
      
      // Execute any actions
      if (response.actions?.length > 0) {
        executeActions(response.actions)
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'error',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className={`chat-interface ${isOpen ? 'open' : ''}`}>
      {/* Chat messages */}
      <div className="messages">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="chat-input">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
          placeholder="Ask about Earth data, request analysis, or get help..."
        />
        <button onClick={sendMessage} disabled={!input.trim() || isLoading}>
          Send
        </button>
      </div>
    </div>
  )
}
```

FEATURES:
- Context-aware responses
- Action execution from chat
- Message history
- Markdown support
- Code syntax highlighting
- Quick reply buttons
- Export conversation
```

### Prompt 24: MCP Server Implementation
```
Implement Model Context Protocol (MCP) server:

MCP SERVER (backend/src/mcp_server.py):
```python
from mcp import Server, Tool, Resource
import asyncio

class GeoGemmaMCPServer:
    def __init__(self):
        self.server = Server("geogemma-mcp")
        self.register_tools()
        self.register_resources()
    
    def register_tools(self):
        @self.server.tool(
            name="query_earth_engine",
            description="Query Google Earth Engine for satellite data"
        )
        async def query_ee(location: str, data_type: str, date_range: dict):
            # Execute Earth Engine query
            result = await ee_service.generate_layer(
                location=location,
                data_type=data_type,
                date_range=(date_range['start'], date_range['end'])
            )
            return result
        
        @self.server.tool(
            name="geocode_location",
            description="Convert place name to coordinates"
        )
        async def geocode(place_name: str):
            # Geocoding implementation
            pass
        
        @self.server.tool(
            name="analyze_time_series",
            description="Analyze temporal changes in satellite data"
        )
        async def time_series_analysis(location, metric, start_date, end_date):
            # Time series analysis
            pass
    
    def register_resources(self):
        @self.server.resource("datasets")
        async def list_datasets():
            return {
                "datasets": [
                    {"id": "sentinel2", "name": "Sentinel-2", "resolution": "10m"},
                    {"id": "landsat8", "name": "Landsat 8", "resolution": "30m"},
                    # ... more datasets
                ]
            }
    
    async def start(self, host="localhost", port=3000):
        await self.server.run(host=host, port=port)
```

INTEGRATION with Gemini:
- Connect Gemini to MCP server
- Tool discovery and calling
- Multi-step workflows
- Result streaming
```

---

## 🤖 Phase 7: Earth Agent (GIS Agent)

### Prompt 25: Earth Agent Advanced Architecture
```
Design advanced GIS Agent with professional capabilities:

EARTH AGENT ARCHITECTURE:
```python
# src/agents/earth_agent.py
from langchain.agents import AgentExecutor
from langchain.tools import Tool

class EarthAgent:
    def __init__(self, gemini_api_key, ee_project):
        self.llm = self.setup_gemini(gemini_api_key)
        self.ee_service = EarthEngineService(ee_project)
        self.tools = self.create_tools()
        self.agent = self.create_agent()
    
    def create_tools(self):
        return [
            Tool(
                name="Analyze_Deforestation",
                func=self.analyze_deforestation,
                description="Analyze forest cover loss in a region"
            ),
            Tool(
                name="Urban_Heat_Island_Analysis",
                func=self.analyze_urban_heat,
                description="Analyze urban heat island effects"
            ),
            Tool(
                name="Flood_Risk_Assessment",
                func=self.assess_flood_risk,
                description="Assess flood vulnerability"
            ),
            Tool(
                name="Carbon_Stock_Estimation",
                func=self.estimate_carbon,
                description="Estimate carbon stocks in forests"
            ),
            Tool(
                name="Agricultural_Productivity",
                func=self.analyze_agriculture,
                description="Analyze crop health and productivity"
            ),
        ]
    
    async def analyze_deforestation(self, location, start_year, end_year):
        """Comprehensive deforestation analysis"""
        # NDVI time series
        # Forest loss detection
        # Rate calculation
        # Driver identification
        # Report generation
        pass
    
    async def analyze_urban_heat(self, city_name):
        """Urban heat island analysis with mitigation proposals"""
        # LST analysis
        # NDVI correlation
        # Building density
        # Green space mapping
        # Mitigation recommendations
        pass
    
    async def execute_analysis(self, natural_language_request):
        """Execute complex multi-step analysis from NL request"""
        result = await self.agent.arun(natural_language_request)
        return result
```

ANALYSIS CAPABILITIES:
- Climate change impact assessment
- Deforestation tracking and drivers
- Urban heat island analysis
- Flood risk modeling
- Drought monitoring
- Agricultural productivity
- Water resource management
- Ecosystem service valuation
- Carbon stock estimation
- Renewable energy site selection
```

### Prompt 26: Environmental Monitoring System
```
Build real-time environmental monitoring:

MONITORING SERVICE:
```python
class EnvironmentalMonitor:
    async def setup_alert(self, region, metric, threshold, frequency):
        """
        Set up automated environmental monitoring alerts.
        
        Examples:
        - Alert if NDVI drops >20% (deforestation)
        - Alert if LST exceeds threshold (heat wave)
        - Alert if water extent changes >30% (flooding/drought)
        """
        pass
    
    async def check_alerts(self):
        """Periodic check of all active monitoring alerts"""
        pass
    
    async def generate_alert_report(self, alert_id):
        """Generate detailed report when alert triggers"""
        pass
```

MONITORING CAPABILITIES:
- Deforestation alerts
- Fire detection
- Flood monitoring
- Drought tracking
- Urban expansion
- Crop health monitoring
- Water quality changes
- Air quality tracking
```

### Prompt 27: Visualization & Reporting Engine
```
Create automated visualization and reporting:

REPORT GENERATOR:
```python
import folium
import matplotlib.pyplot as plt
import plotly.graph_objects as go
from jinja2 import Template

class ReportGenerator:
    async def generate_analysis_report(
        self,
        analysis_type,
        results,
        output_format="pdf"
    ):
        """
        Generate comprehensive analysis report.
        
        Includes:
        - Executive summary
        - Interactive maps (Folium)
        - Charts and graphs (Matplotlib, Plotly)
        - Statistical tables
        - Recommendations
        - References and data sources
        """
        report = {
            "metadata": self.generate_metadata(),
            "summary": await self.generate_summary(results),
            "visualizations": await self.generate_visualizations(results),
            "analysis": await self.generate_detailed_analysis(results),
            "recommendations": await self.generate_recommendations(results),
        }
        
        if output_format == "pdf":
            return await self.render_pdf(report)
        elif output_format == "html":
            return await self.render_html(report)
        else:
            return report
```

VISUALIZATION TYPES:
- Interactive Folium maps with layers
- Time series line charts
- Heatmaps for spatial patterns
- Bar charts for comparisons
- Scatter plots for correlations
- Area charts for trends
- Choropleth maps for regional data
```

---

## 🔐 Phase 8: Firebase Authentication & Firestore

### Prompt 28: Firebase Authentication Setup
```
Implement comprehensive Firebase Authentication:

FIREBASE INITIALIZATION (frontend):
```javascript
// services/firebase.js
import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
```

AUTH CONTEXT:
```javascript
// contexts/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@services/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
      
      // Update API client with auth token
      if (user) {
        user.getIdToken().then(token => {
          localStorage.setItem('authToken', token)
        })
      } else {
        localStorage.removeItem('authToken')
      }
    })
    
    return unsubscribe
  }, [])
  
  const value = {
    user,
    loading,
  }
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
```

LOGIN COMPONENT:
```javascript
// components/auth/LoginModal.jsx
import { useState } from 'react'
import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  GoogleAuthProvider 
} from 'firebase/auth'
import { auth, googleProvider } from '@services/firebase'

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const handleEmailLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      await signInWithEmailAndPassword(auth, email, password)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  const handleGoogleLogin = async () => {
    setLoading(true)
    setError('')
    
    try {
      await signInWithPopup(auth, googleProvider)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="modal">
      {/* Login form UI */}
    </div>
  )
}
```

BACKEND TOKEN VERIFICATION:
```python
# Already implemented in Prompt 13 (FirebaseAuthMiddleware)
```
```

### Prompt 29: Firestore Data Management
```
Implement Firestore for user data persistence:

FIRESTORE SERVICE:
```javascript
// services/firestoreService.js
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from './firebase'

class FirestoreService {
  // User preferences
  async getUserPreferences(userId) {
    const docRef = doc(db, 'users', userId)
    const docSnap = await getDoc(docRef)
    return docSnap.exists() ? docSnap.data() : null
  }
  
  async  updateUserPreferences(userId, preferences) {
    const docRef = doc(db, 'users', userId)
    await setDoc(docRef, preferences, { merge: true })
  }
  
  // Saved queries
  async saveQuery(userId, queryData) {
    const docRef = doc(collection(db, 'savedQueries'))
    await setDoc(docRef, {
      userId,
      ...queryData,
      createdAt: new Date(),
    })
    return docRef.id
  }
  
  async getSavedQueries(userId) {
    const q = query(
      collection(db, 'savedQueries'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }
  
  // Saved layers
  async saveLayer(userId, layerData) {
    const docRef = doc(collection(db, 'savedLayers'))
    await setDoc(docRef, {
      userId,
      ...layerData,
      createdAt: new Date(),
    })
    return docRef.id
  }
  
  // Annotations
  async saveAnnotation(userId, annotationData) {
    const docRef = doc(collection(db, 'annotations'))
    await setDoc(docRef, {
      userId,
      ...annotationData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return docRef.id
  }
  
  async getAnnotations(userId) {
    const q = query(
      collection(db, 'annotations'),
      where('userId', '==', userId)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  }
}

export const firestoreService = new FirestoreService()
```

SECURITY RULES (firestore.rules):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own queries
    match /savedQueries/{queryId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Public sharing
    match /savedLayers/{layerId} {
      allow read: if resource.data.isPublic == true;
      allow write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```
```

---

## 🐳 Phase 9: Docker Containerization

### Prompt 30: Frontend Dockerfile
```
Create optimized multi-stage Docker build for frontend:

FRONTEND DOCKERFILE:
```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

NGINX CONFIGURATION:
```nginx
server {
    listen 80;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript 
               application/x-javascript application/xml+rss 
               application/javascript application/json;
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```
```

### Prompt 31: Backend Dockerfile
```
Create optimized backend Docker image:

BACKEND DOCKERFILE:
```dockerfile
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create non-root user
RUN useradd -m -u 1000 appuser && \
    chown -R appuser:appuser /app

USER appuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:8000/api/health')" || exit 1

# Start application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
```

DOCKER COMPOSE:
```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=http://backend:8000
    depends_on:
      - backend
    networks:
      - geogemma-network
  
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - EE_PROJECT_ID=${EE_PROJECT_ID}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
      - REDIS_HOST=redis
    env_file:
      - .env
    depends_on:
      - redis
    volumes:
      - ./backend:/app
    networks:
      - geogemma-network
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - geogemma-network

volumes:
  redis-data:

networks:
  geogemma-network:
    driver: bridge
```
```

---

## 🚀 Phase 10: Cloud Deployment

### Prompt 32: Google Cloud Run Deployment
```
Deploy backend to Google Cloud Run:

CLOUD BUILD CONFIGURATION (cloudbuild.yaml):
```yaml
steps:
  # Build container image
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'gcr.io/$PROJECT_ID/geogemma-backend:$COMMIT_SHA'
      - '-t'
      - 'gcr.io/$PROJECT_ID/geogemma-backend:latest'
      - './backend'
  
  # Push to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'gcr.io/$PROJECT_ID/geogemma-backend:$COMMIT_SHA'
  
  # Deploy to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      - 'run'
      - 'deploy'
      - 'geogemma-backend'
      - '--image'
      - 'gcr.io/$PROJECT_ID/geogemma-backend:$COMMIT_SHA'
      - '--region'
      - 'us-central1'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'
      - '--memory'
      - '2Gi'
      - '--cpu'
      - '2'
      - '--max-instances'
      - '10'
      - '--set-env-vars'
      - 'EE_PROJECT_ID=$PROJECT_ID'
      - '--set-secrets'
      - 'GEMINI_API_KEY=gemini-api-key:latest'

images:
  - 'gcr.io/$PROJECT_ID/geogemma-backend:$COMMIT_SHA'
  - 'gcr.io/$PROJECT_ID/geogemma-backend:latest'
```

DEPLOYMENT SCRIPT:
```bash
#!/bin/bash
# deploy-backend.sh

PROJECT_ID="your-project-id"
REGION="us-central1"
SERVICE_NAME="geogemma-backend"

echo "Building and deploying to Cloud Run..."

gcloud builds submit --config cloudbuild.yaml \
  --project=$PROJECT_ID

echo "Deployment complete!"
echo "Service URL:"
gcloud run services describe $SERVICE_NAME \
  --region=$REGION \
  --format='value(status.url)'
```
```

### Prompt 33: Firebase Hosting Deployment
```
Deploy frontend to Firebase Hosting:

FIREBASE CONFIGURATION (firebase.json):
```json
{
  "hosting": {
    "public": "frontend/dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|ico)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

DEPLOYMENT SCRIPT:
```bash
#!/bin/bash
# deploy-frontend.sh

echo "Building frontend..."
cd frontend
npm run build

echo "Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "Deployment complete!"
```

GITHUB ACTIONS CI/CD (.github/workflows/deploy.yml):
```yaml
name: Deploy GeoGemma

on:
  push:
    branches:
      - main

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Cloud SDK
        uses: google-github-actions/setup-gcloud@v1
        with:
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          project_id: ${{ secrets.GCP_PROJECT_ID }}
      
      - name: Deploy to Cloud Run
        run: |
          gcloud builds submit --config cloudbuild.yaml
  
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install and Build
        working-directory: ./frontend
        run: |
          npm ci
          npm run build
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: ${{ secrets.FIREBASE_PROJECT_ID }}
```
```

---

## 🧪 Phase 11: Testing & Quality Assurance

### Prompt 34: Backend Testing Suite
```
Implement comprehensive backend testing:

PYTEST CONFIGURATION (pytest.ini):
```ini
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts = 
    --verbose
    --cov=src
    --cov-report=html
    --cov-report=term
    -ra
```

UNIT TESTS:
```python
# tests/unit/test_earth_engine_service.py
import pytest
from src.services.earth_engine_service import EarthEngineService

@pytest.fixture
def ee_service():
    return EarthEngineService(project_id="test-project")

def test_generate_ndvi_layer(ee_service):
    result = ee_service.generate_ndvi_layer(
        location={"type": "Point", "coordinates": [2.3522, 48.8566]},
        date_range=("2023-01-01", "2023-12-31")
    )
    assert result["status"] == "success"
    assert "tile_url" in result
    assert "metadata" in result

def test_calculate_statistics(ee_service):
    stats = ee_service.calculate_statistics(
        image_collection="COPERNICUS/S2_SR",
        region={"type": "Point", "coordinates": [0, 0]}
    )
    assert "mean" in stats
    assert "max" in stats
    assert "min" in stats
```

INTEGRATION TESTS:
```python
# tests/integration/test_api.py
from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_generate_layer_endpoint():
    payload = {
        "location": "Paris",
        "data_type": "ndvi",
        "start_date": "2023-01-01",
        "end_date": "2023-12-31"
    }
    response = client.post("/api/v1/layers/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "tile_url" in data
```
```

### Prompt 35: Frontend Testing Suite
```
Implement frontend testing with Vitest and React Testing Library:

VITEST CONFIGURATION (vitest.config.js):
```javascript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    coverage: {
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
      ],
    },
  },
})
```

COMPONENT TESTS:
```javascript
// tests/components/MapContainer.test.jsx
import { render, screen, waitFor } from '@testing-library/react'
import { MapProvider } from '@contexts/MapContext'
import MapContainer from '@components/map/MapContainer'

describe('MapContainer', () => {
  it('renders map container', () => {
    render(
      <MapProvider>
        <MapContainer />
      </MapProvider>
    )
    const mapElement = screen.getByRole('region')
    expect(mapElement).toBeInTheDocument()
  })
  
  it('initializes map with correct center', async () => {
    render(
      <MapProvider>
        <MapContainer />
      </MapProvider>
    )
    await waitFor(() => {
      // Check map initialization
    })
  })
})
```

E2E TESTS (Playwright):
```javascript
// tests/e2e/user-flow.spec.js
import { test, expect } from '@playwright/test'

test('user can search and add layer', async ({ page }) => {
  await page.goto('http://localhost:5173')
  
  // Search for location
  await page.fill('[data-testid="search-input"]', 'Paris')
  await page.click('[data-testid="search-result-0"]')
  
  // Add NDVI layer
  await page.fill('[data-testid="prompt-input"]', 'Show NDVI')
  await page.click('[data-testid="prompt-submit"]')
  
  // Verify layer added
  await expect(page.locator('[data-testid="layer-card"]')).toBeVisible()
})
```
```

---

## 📊 Phase 12: Monitoring & Analytics

### Prompt 36: Logging and Error Tracking
```
Implement comprehensive logging and error tracking:

STRUCTURED LOGGING:
```python
# backend/src/config/logging.py
import logging
import sys
from pythonjsonlogger import jsonlogger

def setup_logging():
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    
    logHandler = logging.StreamHandler(sys.stdout)
    formatter = jsonlogger.JsonFormatter(
        '%(timestamp)s %(level)s %(name)s %(message)s',
        rename_fields={"level": "severity", "timestamp": "@timestamp"}
    )
    logHandler.setFormatter(formatter)
    logger.addHandler(logHandler)
    
    return logger
```

SENTRY INTEGRATION:
```python
# Backend
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastAPIIntegration

sentry_sdk.init(
    dsn=settings.sentry_dsn,
    integrations=[FastAPIIntegration()],
    traces_sample_rate=0.1,
    environment=settings.environment,
)
```

```javascript
// Frontend
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
})
```
```

### Prompt 37: Performance Monitoring
```
Implement performance monitoring:

GOOGLE ANALYTICS:
```javascript
// Frontend analytics
import ReactGA from 'react-ga4'

ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID)

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path })
}

// Track events
export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  })
}
```

CLOUD MONITORING:
```python
# Backend metrics
from google.cloud import logging
from google.cloud import monitoring_v3

client = monitoring_v3.MetricServiceClient()
project_name = f"projects/{project_id}"

def record_metric(metric_type, value):
    series = monitoring_v3.TimeSeries()
    series.metric.type = f"custom.googleapis.com/{metric_type}"
    point = monitoring_v3.Point()
    point.value.double_value = value
    series.points = [point]
    client.create_time_series(name=project_name, time_series=[series])
```
```

---

## 📚 Phase 13: Documentation & Polish

### Prompt 38: API Documentation
```
Create comprehensive API documentation:

OPENAPI/SWAGGER:
- Automatically generated from FastAPI
- Add detailed descriptions to all endpoints
- Include request/response examples
- Document error codes
- Add authentication requirements

API REFERENCE DOCUMENTS:
- Endpoint descriptions
- Parameters and types
- Response formats
- Code examples in multiple languages
- Rate limits
- Best practices
```

### Prompt 39: User Documentation
```
Create user-facing documentation:

USER GUIDE:
- Getting started tutorial
- Feature walkthroughs
- Video tutorials
- FAQ section
- Troubleshooting guide
- Glossary of terms

DEVELOPER GUIDE:
- Architecture overview
- Setup instructions
- API integration guide
- Contributing guidelines
- Code standards
```

### Prompt 40: Performance Optimization & Launch
```
Final performance optimization and launch preparation:

FRONTEND OPTIMIZATION:
- Code splitting and lazy loading
- Image optimization
- Bundle size reduction
- Lighthouse score optimization (90+)
- Core Web Vitals optimization

BACKEND OPTIMIZATION:
- Query optimization
- Caching strategies
- Connection pooling
- Async optimization
- Load testing and tuning

LIGHTHOUSE TARGETS:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

LAUNCH CHECKLIST:
- Security audit completed
- Performance benchmarks met
- Documentation complete
- Monitoring and alerts configured
- Backup and recovery tested
- User acceptance testing passed
- Marketing materials ready
```

---

## Summary

**40 comprehensive, production-grade prompts** covering the complete GeoGemma development journey:

**Phase 1-2:** Vision, Architecture & Setup (Prompts 1-7)
**Phase 3:** Backend Implementation (Prompts 8-13)
**Phase 4:** Frontend Foundation (Prompts 14-17)
**Phase 5:** UI Components (Prompts 18-22)
**Phase 6:** Gemini Chat & MCP (Prompts 23-24)
**Phase 7:** Earth Agent (Prompts 25-27)
**Phase 8:** Firebase Auth & Firestore (Prompts 28-29)
**Phase 9:** Docker Containerization (Prompts 30-31)
**Phase 10:** Cloud Deployment (Prompts 32-33)
**Phase 11:** Testing (Prompts 34-35)
**Phase 12:** Monitoring (Prompts 36-37)
**Phase 13:** Documentation & Polish (Prompts 38-40)
