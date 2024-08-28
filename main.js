import './style.css'
import './script'

document.querySelector('#app').innerHTML = `
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
`