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
        getCurrentWeather(cityName);
        getFutureWeather(cityName);
        getCurrentDate();
        cityInputEl.value = "";
    } else {
        alert("Please enter city name")
    }
}

var getCurrentWeather = function(cityName) {
    //format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=9e1b9c65c5a45c7606cbddd777f0e91b";
    
    //make a request to the url
    fetch(apiUrl)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            // displayWeather(data, cityName);
            console.log(data);
        });
    }else{
        alert("Please enter valid city name");
    }
})
}

var getFutureWeather = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&cnt=5&units=imperial&&appid=37b206da464f2ac783efca5a706e09d3";

    fetch(apiUrl)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
            });
        }
    })
}

var getCurrentDate = function(cityName) {
    var options = {month: "long", day: "numeric"};
    var today = new Date();
    var currentDay= today.toLocaleDateString("en-US", options);
    dateEl.textContent = currentDay;
}

var displayWeather = function(current, searchTerm){
    currentWeatherContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm;
    //display the current time

    var temp = main.temp;
    console.log(temp);
    // var wind =;
    // var humidity =;
}

searchFormEl.addEventListener("submit", formSubmitHandler);
