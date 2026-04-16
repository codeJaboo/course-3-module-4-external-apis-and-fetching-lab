const form = document.getElementById("weatherForm");
const input = document.getElementById("stateInput");
const output = document.getElementById("output");
const errorBox = document.getElementById("error");
const title = document.getElementById("title");

/**
 * Fetch weather alerts for a state
 */
async function fetchWeatherData(state) {
  if (!state) {
    throw new Error("State input cannot be empty");
  }

  const url = `https://api.weather.gov/alerts?area=${state}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather alerts");
  }

  const data = await response.json();
  return data;
}

/**
 * Display weather alerts in DOM
 */
function displayWeather(data, state) {
  const alerts = data.features || [];

  title.textContent =
    `Current watches, warnings, and advisories for ${state.toUpperCase()}: ${alerts.length}`;

  output.innerHTML = "";

  alerts.forEach((alert) => {
    const div = document.createElement("div");
    div.className = "alert";

    div.innerHTML = `
      <h3>${alert.properties?.headline || "No headline"}</h3>
      <p>${alert.properties?.description || "No description available."}</p>
    `;

    output.appendChild(div);
  });

  // clear error on success
  errorBox.textContent = "";
  errorBox.style.display = "none";
}

/**
 * Display error message
 */
function displayError(message) {
  errorBox.textContent = message;
  errorBox.style.display = "block";
  output.innerHTML = "";
  title.textContent = "";
}

/**
 * Handle form submit
 */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const state = input.value.trim();

  try {
    const data = await fetchWeatherData(state);
    displayWeather(data, state);
  } catch (err) {
    displayError(err.message);
  } finally {
    input.value = "";
  }
});
