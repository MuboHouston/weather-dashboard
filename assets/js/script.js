var cities = [];

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-search");
var currentWeatherContainerEl = document.querySelector("#current-container")
var citySearchTerm = document.querySelector("#city-search-term")
var dateEl = document.querySelector("#date");
var historySearchEl = document.querySelector(".history-search")

var formSubmitHandler = function(event) {
    event.preventDefault();
    //console.log(event);

    //get value from input element
    var cityName = cityInputEl.value.trim();
    
    if(cityName) {
        getLatLon(cityName);
        pastSearch(cityName);
        // saveSearch();
        // cities.unshift(cityName)
        cities.push(cityName)
        // console.log("added", cities);
        cityInputEl.value = "";
    } else {
        alert("Please enter city name")
    }

    localStorage.setItem("cities", JSON.stringify(cities))
    JSON.parse(localStorage.getItem("cities"))
}

var pastSearch = function(pastSearch) {
    // console.log(pastSearch);

    var pastSearchEl = document.createElement("button");

    pastSearch = pastSearch.toLowerCase().split(" ");
    for (let i = 0; i < pastSearch.length; i++) {
        pastSearch[i] = pastSearch[i][0].toUpperCase() + pastSearch[i].substring(1);
    }
    pastSearchEl.textContent = pastSearch.join(" ");
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2 mt-2";
    pastSearchEl.setAttribute("data-city", pastSearch);
    pastSearchEl.setAttribute("type", "submit");
    historySearchEl.prepend(pastSearchEl);          
}

var pastSearchHandler = function (event) {
    var city = event.target.getAttribute("data-city")
    if (city){
        getLatLon(city)
    }
}

// var saveSearch = function() {
//     localStorage.setItem("cities", JSON.stringify(cities))    
// };

var getLatLon = function(cityName) {
    //format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=9e1b9c65c5a45c7606cbddd777f0e91b";
    
    //make a request to the url
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            getWeather(data.coord.lat, data.coord.lon, cityName);;
        });
    }else{
        alert("Please enter valid city name");
    }
})
}

var getWeather = function(lat, lon, cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=37b206da464f2ac783efca5a706e09d3";
    
    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                structureHTML(data, cityName);
                console.log(data);
            });
        }
    })
}

var structureHTML = function (data, cityName) {
    // console.log(data)

    var displayName = cityName.toLowerCase();
    displayName = displayName.split(" ");
    for (let i = 0; i < displayName.length; i++) {
        displayName[i] = displayName[i][0].toUpperCase() + displayName[i].substring(1);
    }
    citySearchTerm.textContent = displayName.join(" ")

    var unixTimestamp = data.current.dt;
    var milliseconds = unixTimestamp * 1000;
    var options = {year: "numeric", month: "numeric", day: "numeric"};
    var date = new Date(milliseconds);
    var currentDate = date.toLocaleDateString("en-US", options)
    dateEl.textContent = "(" + currentDate + ")";
    
    var iconCode = data.current.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    document.querySelector("#wicon").setAttribute("src", iconUrl);

    var getTemp = data.current.temp;
    var TempEl = document.querySelector(".temp");
    TempEl.innerHTML = "Temp: " + getTemp + " &#176F";

    var getWind = data.current.wind_speed;
    var windEl = document.querySelector(".wind");
    windEl.textContent = "Wind: " + getWind + " MPH";

    var getHumidity = data.current.humidity;
    var humidityEl = document.querySelector(".humidity");
    humidityEl.textContent = "Humidity: " + getHumidity + " %";

    var getUVIndex = data.current.uvi;
        var uviNumEl = document.querySelector(".background");
        uviNumEl.textContent = getUVIndex;
        var uviEl = document.querySelector(".uvi")
        uviEl.style.display = "block"
        
        if(getUVIndex < 2){
            uviNumEl.style.backgroundColor = "green";
            uviNumEl.style.display = "inline";
            uviNumEl.style.padding = "5px";
            uviNumEl.style.borderRadius = "10px";
            uviNumEl.style.color = "white"
        }else if (getUVIndex<5){
            uviNumEl.style.backgroundColor = "rgb(235, 235, 119";
            uviNumEl.style.display = "inline";
            uviNumEl.style.padding = "5px";
            uviNumEl.style.borderRadius = "10px";
            uviNumEl.style.color = "white"
        } else {
            uviNumEl.style.backgroundColor = "red";
            uviNumEl.style.display = "inline";
            uviNumEl.style.padding = "5px";
            uviNumEl.style.borderRadius = "10px";
            uviNumEl.style.color = "white"
        }
    
    var forecastEls = document.querySelectorAll(".forecast");
    for (let i=0; i<forecastEls.length; i++) {
        forecastEls[i].innerHTML = "";
        const forecastIndex = i + 1;
        var forecastUnixTimestamp = data.daily[forecastIndex].dt;
        var forecastMilliseconds = forecastUnixTimestamp * 1000;
        var futureDate = new Date(forecastMilliseconds)
        var forecastDate = futureDate.toLocaleDateString("en-US", options)
        var forecastDateEl = document.createElement("p");
        forecastDateEl.setAttribute("class", "forecast-date")
        forecastDateEl.innerHTML = forecastDate;
        forecastEls[i].append(forecastDateEl)

        var forecastWeatherEl = document.createElement("img")
        forecastIconCode = data.daily[forecastIndex].weather[0].icon;
        forecastWeatherEl.setAttribute("src", "http://openweathermap.org/img/w/" + forecastIconCode + ".png")
        forecastEls[i].append(forecastWeatherEl)

        var forecastTempEl = document.createElement("p")
        forecastTempEl.innerHTML = "Temp: " + data.daily[forecastIndex].temp.max + " &#176F";
        forecastEls[i].append(forecastTempEl);

        var forecastWindEl = document.createElement("p")
        forecastWindEl.innerHTML = "Wind: " + data.daily[forecastIndex].wind_speed + " MPH";
        forecastEls[i].append(forecastWindEl);


        var forecastHumidityEl = document.createElement("p")
        forecastHumidityEl.innerHTML = "Humidity: " + data.daily[forecastIndex].humidity + " %";
        forecastEls[i].append(forecastHumidityEl);
    }
}

searchFormEl.addEventListener("submit", formSubmitHandler);
historySearchEl.addEventListener("click", pastSearchHandler);
