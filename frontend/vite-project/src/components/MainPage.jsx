import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchData } from '../utils/fetchData';
import MapView from './MapView';
import TruckTable from './TruckTable';
import '../styles/MainPage.css';
import logo from '../assets/food-truck-logo.png';
import chef from '../assets/food-truck-chef.png';

function MainPage() {
    const location = useLocation();
    const { query: initialQuery } = location.state || {};
    const [query, setQuery] = useState(initialQuery || '');
    const [trucks, setTrucks] = useState([]);
    const [selectedTruck, setSelectedTruck] = useState(null);

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


    const handleRowClick = (truck) => {
        setSelectedTruck(truck);
    };

    return (
        <div className="main-container">
            <div className="content-container">
                <div className="input-table-container">
                    <div className="header-container">
                        <img src={logo} alt="Logo" className="logo-main" />
                        <h5 className="title">Food Truck Finder</h5>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="I would like... Fried Chicken"
                            value={query}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {trucks.length === 0 ? (
                        <div className="header-container">
                            <img src={chef} alt="Logo" className="logo-main" />
                            <h5 className="title">Sorry we couldn't find anything</h5>
                        </div>
                    ) :
                        (
                            <div className="table-container">
                                <TruckTable trucks={trucks} onRowClick={handleRowClick} />
                            </div>
                        )
                    }


                </div>

                <div className="map-container">
                    <MapView trucks={trucks} selectedTruck={selectedTruck} />
                </div>

            </div>
        </div>
    );
}

export default MainPage;
