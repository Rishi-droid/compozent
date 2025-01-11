console.log("JavaScript file linked successfully!");

const API_KEY = "ce43a67c9b3b0431176262738a11f334"; // Replace with your OpenWeather API key
const searchForm = document.getElementById("search");
const queryInput = document.getElementById("query");
const tempElement = document.getElementById("temp");
const weatherIcon = document.getElementById("weather-icon");
const conditionElement = document.getElementById("condition");
const rainElement = document.getElementById("rain");
const locationElement = document.getElementById("location");
const dateElement = document.getElementById("date");

// Helper function to format date
const formatDate = (date) => {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Function to fetch weather data
async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    alert(error.message);
  }
}

// Function to update UI with fetched data
function updateUI(data) {
  const { name } = data;
  const { temp } = data.main;
  const { description } = data.weather[0];
  const iconCode = data.weather[0].icon;
  const { humidity } = data.main;

  tempElement.textContent = `${Math.round(temp)}°C`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.alt = description;
  conditionElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
  rainElement.textContent = `${humidity}%`;
  locationElement.textContent = name;
  dateElement.textContent = formatDate(new Date());
}

// Event listener for search form submission
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = queryInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Initial fetch for default city
fetchWeather(""); // Default city to display on load
