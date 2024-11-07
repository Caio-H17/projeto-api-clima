const apiKey = "3a7fc37a4cbb4aada74130455240711";
const searchButton = document.querySelector(".btn-search");

searchButton.addEventListener("click", async () => {
    const city = document.getElementById("input-search").value;

    if (!city) return;

    const data = await searchWeatherData(city);

    showData(data);
})

async function searchWeatherData(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&lang=pt`;

    const response = await fetch(apiUrl);

    if (response.status !== 200) return;

    const data = await response.json();
    return data;
}

function showData(data) {
    const temperature = Math.round(data.current.temp_c);
    const humidity = data.current.humidity;
    const condition = data.current.condition.text;
    const windSpd = data.current.wind_kph;
    const iconCondition = data.current.condition.icon;
    const cityName = data.location.name;

    document.getElementById("city").textContent = cityName;

    document.getElementById("temperature").textContent = `${temperature} °C`;
    document.getElementById("humidity").textContent = `${humidity} %`;
    document.getElementById("condition").textContent = condition;
    document.getElementById("wind-spd").textContent = `${windSpd} Km/h`;
    document.getElementById("icon-condition").setAttribute("src", iconCondition);
}