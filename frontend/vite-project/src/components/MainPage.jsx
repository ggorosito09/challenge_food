import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchData } from '../utils/fetchData';
import MapView from './MapView';
import TruckTable from './TruckTable';
import './MainPage.css';

function MainPage() {
    const location = useLocation();
    const { query } = location.state || {};
    const [trucks, setTrucks] = useState([]);

    useEffect(() => {
        const getTrucks = async () => {
            const data = await fetchData(query);
            setTrucks(data);
        };
        if (query) {
            getTrucks();
        }
    }, [query]);

    return (
        <div className="main-container">
            <div className="input-table-container">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="I would like... Fried Chicken"
                        defaultValue={query}
                    // Handle search input change here if needed
                    />
                </div>
                <div className="table-container">
                    <TruckTable trucks={trucks} />
                </div>
            </div>
            <div className="map-container">
                <MapView trucks={trucks} />
            </div>
        </div>
    );
}

export default MainPage;
