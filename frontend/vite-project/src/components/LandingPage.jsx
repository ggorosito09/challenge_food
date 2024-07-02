import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import logo from '../assets/food-truck-logo.png';

function LandingPage() {
    const [foodWanted, setFoodWanted] = useState('');
    const navigate = useNavigate();

    const handleGoForEat = () => {
        navigate('/main', { state: { query: foodWanted } });
    };

    return (
        <div className="landing-container">
            <div className="logo-landing">
                <img src={logo} alt="Food Truck Icon" />
                <h1>Food Truck Finder</h1>
            </div>
            <form className="landing-container-form" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="food-search">What would you like to eat today?</label>
                <input
                    type="text"
                    id="food-search"
                    placeholder="I would like... Fried Chicken"
                    value={foodWanted}
                    onChange={(e) => setFoodWanted(e.target.value)}
                />
                <div>
                    <button type="button" onClick={handleGoForEat} disabled={foodWanted === ''}>
                        {foodWanted === '' ? 'Waiting for your wishes...' : "Let's Go For EAAAAAAT"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LandingPage;
