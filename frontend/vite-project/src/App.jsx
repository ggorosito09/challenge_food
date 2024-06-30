import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MapView from './components/MapView';
import TruckTable from './components/TruckTable';
import './App.css';

function App() {
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/data');
        setTrucks(response.data.features)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="map-container">
        <MapView trucks={trucks} />
      </div>
      <div className="table-container">
        <TruckTable trucks={trucks} />
      </div>
    </div>
  );
}

export default App;