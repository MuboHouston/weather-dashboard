var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-search");
var currentWeatherContainerEl = document.querySelector("#current-container")
var citySearchTerm = document.querySelector("#city-search-term")
var dateEl = document.querySelector("#date");

var formSubmitHandler = function(event) {
    event.preventDefault();
    //console.log(event);

    //get value from input element
    var cityName = cityInputEl.value.trim();
    
    if(cityName) {
        getLatLon(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter city name")
    }
}

var getLatLon = function(cityName) {
    //format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=9e1b9c65c5a45c7606cbddd777f0e91b";
    
    //make a request to the url
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            getWeather(data.coord.lat, data.coord.lon, cityName)
            // getCurrentDate(data.dt)
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
    console.log(data)

    citySearchTerm.textContent = cityName;

    var unixTimestamp = data.current.dt;
    var milliseconds = unixTimestamp * 1000;
    var options = {year: "numeric", month: "numeric", day: "numeric"};
    var date = new Date(milliseconds);
    var currentDate = date.toLocaleDateString("en-US", options)
    dateEl.textContent = "(" + currentDate + ")";
    
    var iconCode = data.current.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    document.querySelector("#wicon").setAttribute("src", iconUrl);
    document.querySelector("#wicon").style.textAlign = "center";

    getTemp = data.current.temp;
    TempEl = document.querySelector(".temp");
    TempEl.textContent = getTemp;

    getWind = data.current.wind_speed;
    windEl = document.querySelector(".wind");
    windEl.textContent = getWind;

    getHumidity = data.current.humidity;
    humidityEl = document.querySelector(".humidity");
    humidityEl.textContent = getHumidity;

    getUVIndex = data.current.uvi;
    uviEl = document.querySelector(".uvi");
    uviEl.textContent = getUVIndex;

    if(getUVIndex<2){
        document.querySelector("#color .uvi").style.backgroundColor = "green";
        document.querySelector("#color .uvi").style.display = "inline";
        document.querySelector("#color .uvi").style.padding = "5px";
        document.querySelector("#color .uvi").style.borderRadius = "10px";
    }else if (getUVIndex<5){
        document.querySelector("#color .uvi").style.backgroundColor = "yellow";
        document.querySelector("#color .uvi").style.display = "inline";
        document.querySelector("#color .uvi").style.padding = "5px";
        document.querySelector("#color .uvi").style.borderRadius = "10px";
    } else {
        document.querySelector("#color .uvi").style.backgroundColor = "red";
        document.querySelector("#color .uvi").style.display = "inline";
        document.querySelector("#color .uvi").style.padding = "5px";
        document.querySelector("#color .uvi").style.borderRadius = "10px";
    }
    
}

searchFormEl.addEventListener("submit", formSubmitHandler);
