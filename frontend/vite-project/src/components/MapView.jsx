import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapView.css';
import foodTruckIcon from '../assets/markers/food-truck.png';

// TODO: For later.
// import useGeolocation from '../hooks/useGeolocation';

const customIcon = new L.Icon({
  iconUrl: foodTruckIcon,
  iconSize: [35, 35],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
});

const CurrentLocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true });

    map.on('locationfound', (e) => {
      setPosition(e.latlng);
    });

  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={L.divIcon({ className: 'pulsing-marker' })}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const MapView = ({ trucks, selectedTruck }) => {
  const mapRef = useRef();
  const defaultCenter = [37.7749, -122.4194]; // Default center for San Francisco
  // const center = useGeolocation(defaultCenter);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedTruck && mapRef.current) {
      const { latitude, longitude } = selectedTruck.properties;
      const position = [parseFloat(latitude), parseFloat(longitude)];
      mapRef.current.setView(position, 15);
  
      mapRef.current.eachLayer((layer) => {
        if (layer.getLatLng && layer.getLatLng().equals(position)) {
          layer.openPopup();
        }
      });
    }
  
    if (trucks.length > 0) {
      setLoading(false);
    }
  }, [selectedTruck, trucks]);

  // TODO: Component extract to keep improving.
  const markers = trucks.map((truck, idx) => {
    const {
      latitude,
      longitude,
      applicant,
      fooditems
    } = truck.properties;

    return (
      <Marker
        key={idx}
        position={[parseFloat(latitude), parseFloat(longitude)]}
        icon={customIcon}
      >
        <Popup>
          <b>{applicant}</b><br />
          {fooditems}
        </Popup>
      </Marker>
    );
  });

  return (
    <div className="map-wrapper" style={{ position: 'relative', height: '100%' }}>
      {loading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
      <MapContainer center={[37.7749, -122.4194]} zoom={12} style={{ width: '100%', height: '100%' }} ref={mapRef}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ29uemFsb2dkZXZlbG9wZXJnaXMiLCJhIjoiY2x5MzlzZGR5MDU5bDJqcXZ6ZWpycjIzdyJ9.pzB_r6AtS_RJzNZrv7a4pQ"
          attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
        />
        {markers}
        <CurrentLocationMarker />
      </MapContainer>
    </div>
  );
};

export default MapView;
