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
        getWeather(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter city name")
    }
}

var getWeather = function(cityName) {
    //format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=9e1b9c65c5a45c7606cbddd777f0e91b";
    
    //make a request to the url
    fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
        displayWeather(data, cityName)
    })
})
}

var displayWeather = function(current, searchTerm){
    var options = {month: "long", day: "numeric"};
    var today = new Date();
    var currentDay= today.toLocaleDateString("en-US", options);

    currentWeatherContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;
    //display the current time
    dateEl.textContent = currentDay;

    var temp = main;
    var wind =;
    var humidity =;
}

searchFormEl.addEventListener("submit", formSubmitHandler);
