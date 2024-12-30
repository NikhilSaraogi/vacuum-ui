// Fetch weather data
const weatherAPIKey = '27ab350059885fdb9288a5279d689ee4'; // Replace with your API key

const latitude = 21.4129; // Replace with your desired latitude
const longitude = 79.9671; // Replace with your desired longitude

// OpenWeatherMap API URL
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherAPIKey}&units=metric`;

async function getWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    const weatherDescription = data.weather[0].main;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;

    // Update the DOM
    document.getElementById('weather').textContent = 
      `${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}, ${temperature}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
  } catch (error) {
    console.error('Error fetching weather data:', error);

    // Fallback content if API call fails
    document.getElementById('weather').textContent = 'Weather data unavailable';
    document.getElementById('humidity').textContent = 'Humidity data unavailable';
  }
}

// Call the function to fetch weather data immediately
getWeather();

// Set interval to refresh weather data every 30 minutes (1800000 milliseconds)
setInterval(getWeather, 1800000);
