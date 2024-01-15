document.body
        .addEventListener('click', (e) => {
                if (e.target.classList.value === 'addcity') {
                        document.getElementById('search').style.display = 'block';
                } else if (e.target.classList.value !== 'addcity' && e.target.id !== 'search') {
                        document.getElementById('search').style.display = 'none';
                }
                // console.log(e.target.classList.value==='addcity');
        })

// clock
setInterval(() => {
        document.getElementById('time').innerHTML = new Date().toLocaleTimeString();
}, 1000)

// "23"-56

const fetchweatherData = async (city) => {
        try {
                document.getElementById('time').innerHTML = 'loading...'
                const responses = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=21f10744539dbbf1f149c533fbc67eb3`);

                document.getElementById('citycountry').innerHTML = `${responses.data.name} , ${responses.data.sys.country}`
                document.getElementById('temp').innerText = (responses.data.main.temp - 273.15).toFixed(2);
                document.getElementById('weather').innerHTML = responses.data.weather[0].main;
                document.getElementById('high').innerHTML = responses.data.main.temp_max;
                document.getElementById('low').innerHTML = responses.data.main.temp_min;
                document.getElementById('speed').innerHTML = ((responses.data.wind.speed * 18) / 5).toFixed(2);




        } catch (err) {
                console.log('Invalid city entered');
        }

}


// search
document.getElementById('search').addEventListener('keypress', (e) => {
        if (e.key == 'Enter') {
                console.log(e.target.value);
                fetchweatherData(e.target.value);


        }
})
document.addEventListener('DOMContentLoaded', () => {
    // Add an event listener when the DOM is loaded
    if ('geolocation' in navigator) {
        // Check if geolocation is supported by the browser
        navigator.geolocation.getCurrentPosition((position) => {
            // Callback function if the geolocation is successful
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoordinates(latitude, longitude);
        }, (error) => {
            console.error('Error getting location:', error);
            // If there is an error with geolocation, you can handle it here
        });
    }

    // Other existing code...

    // search
    document.getElementById('search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchWeatherData(e.target.value);
        }
    });
});

const fetchWeatherByCoordinates = async (latitude, longitude) => {
    try {
        document.getElementById('time').innerHTML = 'loading...';
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=21f10744539dbbf1f149c533fbc67eb3`);

        // Update weather information based on the response
        updateWeatherInfo(response.data);
    } catch (err) {
        console.log('Error fetching weather data:', err);
    }
};

const fetchWeatherData = async (city) => {
    try {
        document.getElementById('time').innerHTML = 'loading...';
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=21f10744539dbbf1f149c533fbc67eb3`);

        // Update weather information based on the response
        updateWeatherInfo(response.data);
    } catch (err) {
        console.log('Invalid city entered');
    }
};
// lm
// lm
const updateWeatherInfo = (data) => {
        const weatherImage = document.querySelector('.center img');
        const weatherText = document.getElementById('weather');
    
        console.log('Weather Condition:', data.weather[0].main.toLowerCase());
    
        switch (data.weather[0].main.toLowerCase()) {
            case 'clear':
                weatherImage.src = './resources/clear.gif';
                break;
            case 'clouds':
                weatherImage.src = './resources/cloud.gif';
                break;
            case 'rain':
                weatherImage.src = './resources/rain.gif';
                break;
            case 'wind':
                weatherImage.src = './resources/wind.gif';
                break;
                case 'mist':
                weatherImage.src = './resources/mist.gif';
                break;
            default:
                console.log('No matching image for weather:', data.weather[0].main.toLowerCase());
                weatherImage.src = ''; // Set a default image or leave it empty if none matches
        }
    
        // Update weather text
        weatherText.innerHTML = data.weather[0].main.toLowerCase();
    };
    
    
