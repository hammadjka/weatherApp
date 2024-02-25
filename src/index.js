import './styles.css'

const apiKey = '996105329f024a569fd75434242202';
const baseUrl = 'https://api.weatherapi.com/v1';

async function searchLocation(query) {
    if(!query){
        return
    };

    const endpoint = '/search.json';
    const params = new URLSearchParams({
        key: apiKey,
        q: query
    });
    try {
        const response = await fetch(`${baseUrl}${endpoint}?${params}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function getWeather(locationQuery){
    if(!locationQuery){
        return;
    }
    const endpoint = '/current.json'
    const params = new URLSearchParams({
        key: apiKey,
        q: locationQuery
    })
    try {
        const response = await fetch(`${baseUrl}${endpoint}?${params}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

document.addEventListener("DOMContentLoaded", async () => {

    document.getElementById("search").addEventListener("input", async (event)=>{
        try{
            const autoCompletedResults = await searchLocation(event.target.value);
        }catch(error){
            console.log(error);
        }
        
    });

    document.querySelector("#form").addEventListener("submit", async (e)=>{
        e.preventDefault();
        const formData = new FormData(form);
        const formDataObject = {};
        for (const [key, value] of formData) {
            formDataObject[key] = value;
        }
        const query = formDataObject["search"];
        try{
            const weather = await getWeather(query);
            console.log(weather);
        }catch(error){
            console.log(error);
        }
    })
})