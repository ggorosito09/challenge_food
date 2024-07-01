import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchData } from '../utils/fetchData';
import MapView from './MapView';
import TruckTable from './TruckTable';
import './MainPage.css';

function MainPage() {
    const location = useLocation();
    const { query: initialQuery } = location.state || {};
    const [query, setQuery] = useState(initialQuery);
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

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchData(query).then(data => setTrucks(data));
    };

    return (
        <div className="main-container">
            <div className="input-table-container">
                <div className="input-container">
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="I would like... Fried Chicken"
                            value={query}
                            onChange={handleSearchChange}
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div className="table-container">
                    <TruckTable trucks={trucks} />
                </div>
            </div>
            {trucks.length > 0 && (
                <div className="map-container">
                    <MapView trucks={trucks} />
                </div>
            )}
        </div>
    );
}

export default MainPage;
