import axios from 'axios'

// src/utils/fetchData.js
export const fetchData = async (query) => {
    try {
        const response = await axios.get(`http://localhost:3000/data?q=${query}`);
        return response.data.features;
    } catch (error) {
        console.error('Error fetching data:', error);
    }

};



