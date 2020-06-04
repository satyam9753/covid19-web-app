// HEREIN WE MAKE FUNCTIONS THAT ARE GOING TO FETCH THE DATA WE NEED

import axios from 'axios';

const URL = 'https://covid19.mathdro.id/api';

// FOR 'CARDS'
export const fetchData = async (country) => {

    let newURL = URL;

    if(country) {
        newURL = `${URL}/countries/${country}`;
    }

    try {
        // const response = await axios.get(URL);
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(newURL);

        const modifiedData = { confirmed, recovered, deaths, lastUpdate };
        return modifiedData;
        // return response; 
        // console.log(response);

    } catch (error) {
        console.log(error);
    }
}

// FOR 'CHARTS'
export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${URL}/daily`);
        // console.log(data);

        const modifiedData = data.map((dailyData) => ({
        
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate, 
        
        }));
        
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

// FOR 'CHOOSE COUNTRY'
export const countries = async () => {
    try {
        const { data: {countries} } = await axios.get(`${URL}/countries`);
        // console.log(countries);
        return (countries.map((country) => country.name));
    } catch (error) {
        console.log(error);
    }
}