# Vibe Coding Prompts - GeoGemma Project

This document contains all the prompts used during the vibe coding journey to build GeoGemma, its chat interface, and the Earth Agent (GIS Agent).

---

## 🌍 GeoGemma Core Application

### Initial Vision
```
Build a web application that lets users explore Earth Engine satellite imagery using natural language queries. 
Users should be able to type "Show me NDVI in Paris" and see vegetation indices on an interactive map.
```

### Map Interface
```
Create an interactive map using React and Leaflet that can display multiple Earth Engine layers with 
opacity controls. Include measurement tools for distance calculation and layer management for visibility.
```

### Natural Language Processing
```
Implement a natural language query parser that can extract location, date ranges, and data types from 
user queries like "Show RGB imagery of Tokyo from Landsat 8" or "NDVI in Amazon rainforest for 2023"
```

### Data Layer Support
```
Add support for multiple Earth Engine data layers:
- RGB Satellite Imagery (Sentinel-2 and Landsat)
- Normalized Difference Vegetation Index (NDVI)
- Surface Water Analysis
- Land Use/Land Cover Classification (LULC)
- Land Surface Temperature (LST)
- Open Buildings Dataset with height information
```

### Time Series Analysis
```
Build a time series analysis feature that tracks changes over time for any supported data type. 
Users should be able to compare imagery between different dates with side-by-side visualization.
```

### Backend Architecture
```
Create a FastAPI backend with modular services:
- Earth Engine service for data processing
- Pixel value extraction service
- Layer generation service
- Metadata service for comprehensive information about each layer
Include proper error handling and rate limiting middleware.
```

### Authentication & Security
```
Implement Firebase authentication for user management with JWT tokens. Add rate limiting middleware 
set at 60 requests per minute. Ensure proper CORS configuration and session management.
```

---

## 💬 GeoGemma Chat Interface

### AI Assistant Integration
```
Integrate Google Gemini AI into the GeoGemma interface to create a conversational AI assistant 
that can discuss Earth science topics, explain data visualizations, and provide context about 
satellite imagery.
```

### Chat Context Awareness
```
Make the chat interface context-aware of the current map state. When users ask questions about 
what they're viewing, the AI should have access to current layer information, location, and 
time range to provide relevant answers.
```

### Natural Language Queries
```
Enable the chat interface to process natural language geospatial queries and automatically 
update the map. Users should be able to chat naturally like "Can you show me the forest cover 
in Brazil?" and have the map respond accordingly.
```

### Conversational History
```
Implement chat history that maintains conversation context across multiple queries. Users should 
be able to ask follow-up questions like "Now show me the same area from last year" and have the 
system understand the reference.
```

### Educational Responses
```
Program the chat to provide educational explanations about geospatial concepts when users ask 
questions like "What is NDVI?" or "How does Sentinel-2 work?" Make it friendly and accessible 
to non-experts.
```

---

## 🤖 Earth Agent (GIS Agent)

### Advanced GIS Agent Vision
```
Create an advanced GIS AI Agent that goes beyond simple visualization to provide deep geospatial 
analysis, climate impact assessment, environmental monitoring, and sustainability planning. Use 
FastAPI for the backend with enterprise-grade security and performance.
```

### Geospatial Analysis Capabilities
```
Implement comprehensive geospatial analysis tools using Earth Engine, GeoPandas, Shapely, and 
Rasterio. The agent should handle:
- Climate analysis and environmental impact assessment
- Sustainability and resilience planning
- Advanced spatial analysis and modeling
- Real-time monitoring and alerting systems
```

### Natural Language Interface
```
Build a natural language processing system that allows users to request complex GIS analyses 
in plain English. For example: "Analyze urban heat islands in Phoenix and propose mitigation 
strategies" or "Assess flood risk in coastal regions based on sea level rise projections"
```

### Visualization & Reporting
```
Create automated visualization and reporting using Folium for interactive maps, Matplotlib for 
charts, and Plotly for interactive analytical visualizations. Generate comprehensive reports 
with maps, charts, and insights.
```

### Production Deployment
```
Set up production-ready deployment with Docker and Docker Compose. Include:
- Nginx reverse proxy with SSL/TLS support
- Redis caching for performance
- Rate limiting at both application and Nginx layers
- Proper security headers (CSP, HSTS, X-Frame-Options)
- Health monitoring endpoints
```

### API Security
```
Implement comprehensive security measures:
- JWT authentication for API access
- API key management with rotation policies
- Content Security Policy headers
- Rate limiting per IP and per user
- Input validation and sanitization
- Secure credential management using environment variables
```

### Environmental Monitoring
```
Build real-time environmental monitoring capabilities that can track:
- Deforestation and forest health
- Water quality and availability
- Urban expansion and land use changes
- Agricultural productivity and crop health
- Climate indicators and anomalies
Enable automated alerts when significant changes are detected.
```

### Climate Impact Assessment
```
Create tools for assessing climate change impacts including:
- Temperature trend analysis
- Extreme weather event tracking
- Drought and flood risk assessment
- Carbon stock estimation
- Sea level rise vulnerability analysis
Provide actionable insights for adaptation and mitigation planning.
```

### Sustainability Planning
```
Develop sustainability planning features that help organizations and governments:
- Identify optimal locations for renewable energy infrastructure
- Plan urban green spaces for maximum cooling effect
- Assess ecosystem service values
- Model scenarios for sustainable development
- Track progress toward sustainability goals
```

### Data Integration
```
Integrate multiple geospatial data sources:
- Google Earth Engine datasets (Landsat, Sentinel, MODIS)
- Custom vector and raster data uploads
- Real-time weather and climate data
- Demographic and socioeconomic data
- OpenStreetMap and other open data sources
Make them accessible through a unified API.
```

---

## 🔧 Technical Infrastructure Prompts

### Frontend Build System
```
Set up a modern React frontend with Vite for fast development and optimized production builds. 
Use Tailwind CSS for styling, Leaflet for maps, and proper state management with Context API.
Configure environment variables for different deployment environments.
```

### Backend API Design
```
Design RESTful API endpoints following best practices:
- Proper HTTP method usage (GET, POST, PUT, DELETE)
- Consistent response formats with proper status codes
- Comprehensive error handling with meaningful messages
- API versioning for future compatibility
- OpenAPI/Swagger documentation
```

### Database & Storage
```
Implement Firebase Firestore for user data and application state. Use Cloud Storage for 
generated visualizations and reports. Design efficient data models that minimize reads and 
optimize for common query patterns.
```

### Performance Optimization
```
Optimize application performance:
- Implement caching strategies for frequently accessed Earth Engine data
- Use Redis for session and query result caching
- Lazy load components and code split the frontend
- Optimize image delivery with proper formats and compression
- Implement progressive loading for large datasets
```

### Testing & Quality Assurance
```
Set up comprehensive testing:
- Unit tests for critical backend functions
- Integration tests for API endpoints
- Frontend component tests
- End-to-end tests for critical user flows
Aim for good coverage on core functionality.
```

---

## 🚀 Deployment & DevOps Prompts

### Docker Containerization
```
Containerize both frontend and backend applications. Create optimized multi-stage Docker builds 
that minimize image size. Set up docker-compose for local development with all services including 
Redis and Nginx.
```

### Cloud Deployment
```
Deploy GeoGemma to cloud platforms:
- Backend on Cloud Run or similar container platforms
- Frontend on Firebase Hosting or Vercel
- Earth Agent on dedicated servers with Docker
Configure proper environment variables, secrets management, and CI/CD pipelines.
```

### Monitoring & Logging
```
Implement comprehensive logging and monitoring:
- Structured logging with proper log levels
- Error tracking and alerting
- Performance monitoring and profiling
- User analytics for feature usage
- API endpoint metrics and health checks
```

---
