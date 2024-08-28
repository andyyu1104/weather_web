(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function p(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(n){if(n.ep)return;n.ep=!0;const o=p(n);fetch(n.href,o)}})();const g=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];document.getElementById("date");const d=new Date;d.getDate();d.getMonth()+1;d.getFullYear();g[d.getDay()];var s=document.querySelector("link[rel~='icon']");const l="af9168d8d86e2450506d9a7074c45930";navigator.geolocation.getCurrentPosition(f,y);function f(e){const r=e.coords;w(r.latitude,r.longitude),v(r.latitude,r.longitude)}function y(e){document.getElementsByTagName("main")[0].innerHTML="Unable to retrieve your location. Please allow location access.",console.warn(`ERROR(${e.code}): ${e.message}`)}function w(e,r){const p=`https://api.openweathermap.org/data/2.5/weather?lat=${e}&lon=${r}&appid=${l}&units=metric`;fetch(p).then(t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()}).then(t=>{T(t)}).catch(t=>{console.error("There was a problem with the fetch operation:",t)})}function v(e,r){const p=`https://api.openweathermap.org/data/2.5/forecast?lat=${e}&lon=${r}&appid=${l}&units=metric`;fetch(p).then(t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()}).then(t=>{x(t)}).catch(t=>{console.error("There was a problem with the fetch operation:",t)})}function x(e){const r=document.getElementsByClassName("forecastSpan")[0],p=e.list;let t=[],n=d;for(let i=0;i<3;i++){const c=new Date(n);c.setDate(n.getDate()+1),t.push(c),n=c}var o=[],a=[];for(let i=0;i<t.length;i++)a.push(`${t[i].getFullYear()}-${String(t[i].getMonth()+1).padStart(2,"0")}-${String(t[i].getDate()).padStart(2,"0")} 09:00:00`);for(let i of p)(i.dt_txt===a[0]||i.dt_txt===a[1]||i.dt_txt===a[2])&&o.push(i);for(let i of o){const c=document.createElement("figure"),h=document.createElement("img");h.src=`https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`,h.alt=i.weather[0].description;const m=document.createElement("figcaption");m.textContent=i.dt_txt.slice(0,10);const u=document.createElement("p");u.textContent="Average temperature: "+i.main.temp,c.appendChild(h),c.appendChild(m),c.appendChild(u),r.appendChild(c)}}function T(e){document.getElementById("city").innerText=e.name,document.getElementById("country").innerText=e.sys.country,document.getElementById("weather").innerText=e.weather[0].main,document.getElementById("weatherIcon").src=`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`,document.getElementById("weatherIcon").alt=e.weather[0].description,s||(s=document.createElement("link"),s.rel="icon",s.type="image/png",document.head.appendChild(s)),s.href=`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`,document.getElementById("temperature").innerText=e.main.temp.toFixed(1)+"°C",document.getElementById("max-temperature").innerText=e.main.temp_max.toFixed(1)+"°C",document.getElementById("min-temperature").innerText=e.main.temp_min.toFixed(1)+"°C",document.getElementById("weatherDescription").innerText=e.weather[0].description}document.querySelector("#app").innerHTML=`
    <header>
        <span>
            <h1>Welcome to Weather app!</h1>
        </span>
    </header>

    <main>
        <span id="citySpan">
            <div>
                <h1 id="city"></h1>
                <h2 id="country"></h2>
            </div>

            <img src="" id="weatherIcon" alt="weather icon">
        </span>

        <div>
            <span>
                <p id="date"></p>
                <p id="day"></p>
                <p id="clock"></p>
            </span>
        </div>

        <span>
            <div>
                <h2>Weather</h2>
                <p id="weather"></p>
            </div>
            <div>
                <h2>Temperature</h2>
                <p id="temperature"></p>
            </div>
            <span>
                <div>
                    <h3>Highest</h3>
                    <p id="max-temperature"></p>
                </div>
                <div>
                    <h3>Lowest</h3>
                    <p id="min-temperature"></p>
                </div>
            </span>
        </span>

        <div>
            <h1>Seem today is likely to be...</h1>
            <p id="weatherDescription"></p>

        </div>

        <div>
            <h2>Coming 3 days</h2>
            <span class="forecastSpan">
                <!-- <figure>
                    <img src="https://picsum.photos/id/287/250/300" alt="Day1 weather">
                    <figcaption>The Day</figcaption>
                </figure>
                <figure>
                    <img src="https://picsum.photos/id/287/250/300" alt="Day2 weather">
                    <figcaption>The Day</figcaption>
                </figure>
                <figure>
                    <img src="https://picsum.photos/id/287/250/300" alt="Day3 weather">
                    <figcaption>The Day</figcaption>
                </figure>
                <figure>
                    <img src="https://picsum.photos/id/287/250/300" alt="Day4 weather">
                    <figcaption>The Day</figcaption>
                </figure>
                <figure>
                    <img src="https://picsum.photos/id/287/250/300" alt="Day5 weather">
                    <figcaption>The Day</figcaption>
                </figure> -->
            </span>

        </div>
    </main>

    <footer>
        <p>
            This web app is created by Andy Yu.
            <br />
            This weather app has used openweathermap.org api.
        </p>

    </footer>
`;
