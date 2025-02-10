// Weather API Request

// returns data
export async function getWeather() {

// Parameters
const lat = 40.9949;
const lng = -73.7929;
const timezone = "auto"; 
let dataArray = "";

// URL
const url = `https://api.open-meteo.com/v1/forecast?
latitude=${lat}
&longitude=${lng}
&current=precipitation
&minutely_15=precipitation
&hourly=precipitation
&precipitation_unit=inch
&timezone=America%2FNew_York`;

// Request
await fetch(url)
  .then(response => response.json())
  .then(data => {
    dataArray = data;
  })
  .catch(error => console.error("Error fetching weather data:", error));

  return dataArray;
}