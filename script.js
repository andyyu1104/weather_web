const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dateText = document.getElementById("date");
const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();
const day = days[today.getDay()];
var favicon = document.querySelector("link[rel~='icon']");
const API_key = import.meta.env.VITE_WEATHER_API_KEY;

navigator.geolocation.getCurrentPosition(success, error);//get user location





//getting current position, error handling
function success(pos) {
    const crd = pos.coords;

    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);

    fetchWeatherAPI(crd.latitude, crd.longitude);//fetch weather api with the coordinate
    fetchForecastAPI(crd.latitude, crd.longitude)


}
function error(err) {
    document.getElementsByTagName("main")[0].innerHTML = "Unable to retrieve your location. Please allow location access."
    console.warn(`ERROR(${err.code}): ${err.message}`);
}


//getting today weather 
function fetchWeatherAPI(lat, lon) {
    const apiLink = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`;
    fetch(apiLink)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateWeatherInfo(data); //use api data
            //console.log(data)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

//getting forecast data
function fetchForecastAPI(lat, lon) {
    const apiLink = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`;
    fetch(apiLink)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            updateForecastInfo(data); //use api data
            //console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function updateForecastInfo(forecastData) {
    const forecastSpan = document.getElementsByClassName("forecastSpan")[0];

    const forecastList = forecastData.list;

    //implementing next 3 days weather
    let nextThreeDates = [];
    let currDate = today;
    for (let index = 0; index < 3; index++) {
        const nextDate = new Date(currDate);
        nextDate.setDate(currDate.getDate() + 1);
        nextThreeDates.push(nextDate);
        currDate = nextDate;
    }
    //console.log(nextThreeDates);

    var threeDayWeathers = [];
    var targetTimes = [];

    //building what specific times we are looking for 
    for (let i = 0; i < nextThreeDates.length; i++) {
        // console.log(nextThreeDates[i]);
        targetTimes.push(`${nextThreeDates[i].getFullYear()}-${String(nextThreeDates[i].getMonth() + 1).padStart(2, "0")}-${String(nextThreeDates[i].getDate()).padStart(2, "0")} 09:00:00`);
    }

    for (let day of forecastList) {
        if (day.dt_txt === targetTimes[0] || day.dt_txt === targetTimes[1] || day.dt_txt === targetTimes[2]) {
            threeDayWeathers.push(day);
        }
    }

    //console.log(threeDayWeathers);

    for (let day of threeDayWeathers) {
        const newFig = document.createElement("figure");

        const newImg = document.createElement("img");
        newImg.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        newImg.alt = day.weather[0].description;
        //`https://openweathermap.org/img/wn/${tomorrowWeather.weather.icon}@2x.png`
        const newFigCap = document.createElement("figcaption");
        newFigCap.textContent = day.dt_txt.slice(0, 10);

        const newPara = document.createElement("p");
        newPara.textContent = "Average temperature: " + day.main.temp;

        newFig.appendChild(newImg);
        newFig.appendChild(newFigCap);
        newFig.appendChild(newPara);

        forecastSpan.appendChild(newFig);
    }

    /*
     * showing only tomorrow 9am weather for testing
     */
    // const tomorrow = new Date(today)
    // tomorrow.setDate(today.getDate() + 1);
    // // console.log(tomorrow);
    // // console.log(tomorrow.getFullYear());
    // // console.log(tomorrow.getMonth() + 1);
    // // console.log(String(tomorrow.getDate()).padStart(2, "0"));
    // var tomorrowWeather = null;
    // const targetTime = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")} 09:00:00`;

    // //console.log(`${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")} 09:00:00`);

    // for (let day of forecastList) {
    //     if (day.dt_txt === targetTime) {
    //         tomorrowWeather = day;
    //         break;
    //     }
    // }
    // //console.log(tomorrowWeather);
    // {
    //     const newFig = document.createElement("figure");

    //     const newImg = document.createElement("img");
    //     newImg.src = `https://openweathermap.org/img/wn/${tomorrowWeather.weather[0].icon}@2x.png`;
    //     newImg.alt = tomorrowWeather.weather[0].description;
    //     //`https://openweathermap.org/img/wn/${tomorrowWeather.weather.icon}@2x.png`
    //     const newFigCap = document.createElement("figcaption");
    //     newFigCap.textContent = `${tomorrow.getFullYear()}/${String(tomorrow.getMonth() + 1).padStart(2, "0")}/${String(tomorrow.getDate()).padStart(2, "0")}`;

    //     newFig.appendChild(newImg);
    //     newFig.appendChild(newFigCap);

    //     forecastSpan.appendChild(newFig);
    // }
}

function updateWeatherInfo(weatherData) {
    document.getElementById("city").innerText = weatherData.name;
    document.getElementById("country").innerText = weatherData.sys.country;
    document.getElementById("weather").innerText = weatherData.weather[0].main;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${weatherData.weather[0]["icon"]}@2x.png`;
    document.getElementById("weatherIcon").alt = weatherData.weather[0].description;
    if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = "image/png";
        document.head.appendChild(favicon);
    }
    favicon.href = `https://openweathermap.org/img/wn/${weatherData.weather[0]["icon"]}@2x.png`;
    document.getElementById("temperature").innerText = weatherData.main.temp.toFixed(1) + "°C";
    document.getElementById("max-temperature").innerText = weatherData.main.temp_max.toFixed(1) + "°C";
    document.getElementById("min-temperature").innerText = weatherData.main.temp_min.toFixed(1) + "°C";
    document.getElementById("weatherDescription").innerText = weatherData.weather[0].description
};

// //main program when user get to this page
function main() {

    dateText.innerText = `${date}/${month}/${year}`;
    document.getElementById("day").innerText = day;



}

// main();
