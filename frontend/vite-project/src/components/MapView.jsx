import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView({ trucks }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      map.setView([37.7749, -122.4194], 12); // Center on San Francisco
    }
  }, [map]);

  return (
    <MapContainer
      whenCreated={setMap}
      style={{ height: '100%', width: '100%' }}
      center={[37.7749, -122.4194]}
      zoom={12}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {trucks.map((truck, idx) => (
        <Marker
          key={idx}
          position={[truck.geometry.coordinates[1], truck.geometry.coordinates[0]]}
        >
          <Popup>
            <b>{truck.properties.applicant}</b><br />
            {truck.properties.fooditems}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;
