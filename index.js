// bus-tracking-system.js

class BusTrackingSystem {
    constructor() {
        this.map = null;
        this.buses = new Map(); // Store active buses
        this.routes = new Map(); // Store bus routes
        this.userLocation = null;
        this.apiKey = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyArXtWdllsylygVw5t_k-22sXUJn-jMU8k&libraries=places&callback=initMap&loading=async';
        this.initializeSystem();
    }

    // Initialize the entire tracking system
    initializeSystem() {
        this.initMap();
        this.setupLocationTracking();
        this.setupEventListeners();
        this.fetchBusRoutes();
        this.startRealTimeBusTracking();
    }

    // Initialize Google Maps
    initMap() {
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 47.4979, lng: 19.0402 }, // Budapest default
            zoom: 12,
            mapTypeControl: true,
            streetViewControl: false
        });
    }

    // User location tracking
    setupLocationTracking() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    this.userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.updateUserMarker();
                },
                (error) => {
                    console.error("Error obtaining location", error);
                },
                { 
                    enableHighAccuracy: true, 
                    maximumAge: 30000, 
                    timeout: 27000 
                }
            );
        }
    }

    // Update user marker on map
    updateUserMarker() {
        if (this.userMarker) {
            this.userMarker.setPosition(this.userLocation);
        } else {
            this.userMarker = new google.maps.Marker({
                position: this.userLocation,
                map: this.map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: 'blue',
                    fillOpacity: 0.8,
                    strokeColor: 'white'
                },
                title: 'Your Location'
            });
        }
    }

    // Fetch bus routes from backend
    async fetchBusRoutes() {
        try {
            const response = await fetch('/api/bus-routes');
            const routes = await response.json();
            
            routes.forEach(route => {
                this.routes.set(route.id, route);
                this.drawRouteOnMap(route);
            });
        } catch (error) {
            console.error("Failed to fetch bus routes", error);
        }
    }

    // Draw route on map
    drawRouteOnMap(route) {
        const routePath = new google.maps.Polyline({
            path: route.coordinates,
            geodesic: true,
            strokeColor: route.color,
            strokeOpacity: 0.8,
            strokeWeight: 3
        });
        routePath.setMap(this.map);
    }

    // Real-time bus tracking
    startRealTimeBusTracking() {
        // WebSocket for real-time updates
        const socket = new WebSocket('wss://your-bus-tracking-server.com/live-tracking');
        
        socket.onmessage = (event) => {
            const busUpdate = JSON.parse(event.data);
            this.updateBusPosition(busUpdate);
        };
    }

    // Update individual bus position
    updateBusPosition(busData) {
        if (!this.buses.has(busData.busId)) {
            // Create new bus marker if not exists
            const busMarker = new google.maps.Marker({
                position: { 
                    lat: busData.latitude, 
                    lng: busData.longitude 
                },
                map: this.map,
                icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 5,
                    rotation: busData.heading,
                    fillColor: 'red',
                    fillOpacity: 0.8,
                    strokeColor: 'black'
                },
                title: `Bus ${busData.busId}`
            });
            this.buses.set(busData.busId, busMarker);
        } else {
            // Update existing bus marker
            const marker = this.buses.get(busData.busId);
            marker.setPosition({
                lat: busData.latitude,
                lng: busData.longitude
            });
        }
    }

    // Search for bus stops
    async searchBusStop(query) {
        try {
            const response = await fetch(`/api/bus-stops?query=${query}`);
            const stops = await response.json();
            
            this.displayBusStops(stops);
        } catch (error) {
            console.error("Bus stop search failed", error);
        }
    }

    // Display bus stops on map
    displayBusStops(stops) {
        stops.forEach(stop => {
            new google.maps.Marker({
                position: { 
                    lat: stop.latitude, 
                    lng: stop.longitude 
                },
                map: this.map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 7,
                    fillColor: 'green',
                    fillOpacity: 0.8,
                    strokeColor: 'white'
                },
                title: stop.name
            });
        });
    }

    // Setup event listeners
    setupEventListeners() {
        document.getElementById('search-button').addEventListener('click', () => {
            const query = document.getElementById('search-input').value;
            this.searchBusStop(query);
        });

        document.getElementById('nearest-stops').addEventListener('click', this.findNearestStops.bind(this));
    }

    // Find nearest bus stops to user
    findNearestStops() {
        if (!this.userLocation) {
            alert("Location not available");
            return;
        }

        fetch(`/api/nearest-stops?lat=${this.userLocation.lat}&lng=${this.userLocation.lng}`)
            .then(response => response.json())
            .then(stops => {
                this.displayBusStops(stops);
                // Optional: Create an info panel with stop details
                this.showNearestStopsPanel(stops);
            });
    }

    // Show nearest stops panel
    showNearestStopsPanel(stops) {
        const panel = document.getElementById('nearest-stops-panel');
        panel.innerHTML = stops.map(stop => `
            <div class="stop-item">
                <h3>${stop.name}</h3>
                <p>Distance: ${stop.distance} meters</p>
                <p>Buses: ${stop.buses.join(', ')}</p>
            </div>
        `).join('');
    }
}

// Initialize the system when page loads
document.addEventListener('DOMContentLoaded', () => {
    const busTrackingSystem = new BusTrackingSystem();
});