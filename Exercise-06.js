const apiKey = "YOUR_API_KEY_HERE"; // Get one from openweathermap.org
const btn = document.getElementById("btn");
const result = document.getElementById("result");
const cityInput = document.getElementById("city");

// Function to fetch weather using async/await
async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    showWeather(data);

    // Save to localStorage
    localStorage.setItem("lastCity", city);
  } catch (err) {
    result.innerHTML = `<p style="color:red;">❌ ${err.message}</p>`;
  }
}

// Function to display weather
function showWeather(data) {
  result.innerHTML = `
    <h3>${data.name}</h3>
    <p>🌡 Temp: ${data.main.temp} °C</p>
    <p>🌤 ${data.weather[0].description}</p>
  `;
}

// When button clicked
btn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    result.innerHTML = "<p style='color:orange;'>⚠️ Enter a city name</p>";
  }
});

// Load last searched city on page start
window.addEventListener("load", () => {
  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    cityInput.value = lastCity;
    getWeather(lastCity);
  }
});
