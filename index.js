const input = document.getElementById("stateInput");
const button = document.getElementById("getAlertsBtn");
const results = document.getElementById("results");
const errorBox = document.getElementById("error");

button.addEventListener("click", function () {
  let state = input.value;

  input.value = "";

  fetchWeatherData(state);
});

async function fetchWeatherData(state) {
  try {
    if (!state) {
      displayError("Enter state first");
      return;
    }

    let res = await fetch("https://api.weather.gov/alerts/active?area=" + state);

    if (!res.ok) {
      displayError("Something went wrong");
      return;
    }

    let data = await res.json();

    displayWeather(data);

  } catch (err) {
    displayError("Error loading data");
  }
}

function displayWeather(data) {
  let alerts = data.features;

  results.innerHTML =
    "Current watches, warnings, and advisories: " + alerts.length;

  errorBox.innerHTML = "";
}

function displayError(msg) {
  errorBox.innerHTML = msg;
  results.innerHTML = "";
}
