import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleGoForEat = () => {
        navigate('/main', { state: { query: input } });
    };

    return (
        <div className="landing-container">
            <div className="logo">
                <img src="path-to-your-foodtruck-icon.png" alt="Food Truck Icon" />
                <h1>Food Truck Finder</h1>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="food-search">What would you like to eat today?</label>
                <input
                    type="text"
                    id="food-search"
                    placeholder="I would like... Fried Chicken"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="button" onClick={handleGoForEat}>
                    Let's Go For EAAAAAAT
                </button>
            </form>
        </div>
    );
}

export default LandingPage;
