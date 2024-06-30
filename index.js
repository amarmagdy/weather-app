var todayName = document.getElementById("todayDateName");
var todayNumber = document.getElementById("todayDateNumber");
var todayMonth = document.getElementById("todayDateMonth");
var todayLocation = document.getElementById("todayLocation");
var todayTemp = document.getElementById("todayTemp");
var todayCondImg = document.getElementById("todayCondImg");
var todayCondText = document.getElementById("todayCondText");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");
var windDirection = document.getElementById("windDirection");
var nextDay = document.getElementsByClassName("next-day-name");
var nextMaxTemp = document.getElementsByClassName("next-max-temp");
var nextMinTemp = document.getElementsByClassName("next-min-temp");
var nextCondImg = document.getElementsByClassName("next-cond-img");
var nextCondText = document.getElementsByClassName("next-cond-text");
var searchInput = document.getElementById("search");
async function fetchData(cityName){
    var response =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=3d1f75aa32a9491a920221959242606&q=${cityName}&days=3`);
    var data = await response.json();
    return data;    
}

function displayTodayData(data){
    let todayDate = new Date();
    todayName.innerHTML = todayDate.toLocaleDateString("en-UK",{weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate();
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-UK",{month:"long"})
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayCondImg.setAttribute("src","https://" + data.current.condition.icon);
    todayCondText.innerHTML = data.current.condition.text;
    humidity.innerHTML = data.current.humidity+"%";
    wind.innerHTML = data.current.wind_kph + "km/h";
    windDirection.innerHTML = data.current.wind_dir;
}
function displatNextData(data){
    var forecastData = data.forecast.forecastday;
    
    for(i = 0 ; i < 2 ; i++){
        let nextDate = new Date(forecastData[i+1].date);
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-UK",{weekday:"long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c;
        nextCondImg[i].setAttribute("src","https://" + forecastData[i+1].day.condition.icon);
        nextCondText[i].innerHTML = forecastData[i+1].day.condition.text;
    }
}
async function startApp(city="cairo"){
    var weatherData= await fetchData(city);
    if(!weatherData.error){
        displayTodayData(weatherData);
        displatNextData(weatherData);
    }
    
}
startApp();
searchInput.addEventListener("input", function(){
        startApp(searchInput.value);
})