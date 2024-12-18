import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const BusMap = () => {
  const [busLocations, setBusLocations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch real-time bus locations
    const fetchBusLocations = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://your-bus-api-endpoint.com/locations');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setBusLocations(data);
      } catch (err) {
        console.error('Error fetching bus locations:', err);
        setError('Could not fetch bus locations');
      }
    };

    // Fetch initial data
    fetchBusLocations();

    // Set up interval to fetch data every 30 seconds
    const intervalId = setInterval(fetchBusLocations, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bus-map-container">
      {error && <div className="error-message">{error}</div>}
      
      <MapContainer 
        center={[47.4979, 19.0402]} // Default to Budapest coordinates
        zoom={13} 
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {busLocations.map((bus, index) => (
          <Marker 
            key={index} 
            position={[bus.latitude, bus.longitude]}
          >
            <Popup>
              Bus Route: {bus.routeNumber}<br />
              Last Updated: {new Date(bus.timestamp).toLocaleString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BusMap;