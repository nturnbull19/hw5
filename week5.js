window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
  
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event) {
      // - Ignore the default behavior of the button
      event.preventDefault()
  
      // - Get a reference to the element containing the user-entered location
      let locationInput = document.querySelector(`#location`)
  
      // - Get the user-entered location from the element's value
      let location = locationInput.value

      // - Get a reference to the element containing the user-entered Days
      let daysInput = document.querySelector(`#days`)

      // - Get the user-entered days from the element's value
      let days = daysInput.value
  
      // - Check to see if the user entered anything; if so:
      if (location.length > 0 && days > 0) {
            // - Construct a URL to call the WeatherAPI.com API
            let url = `https://api.weatherapi.com/v1/forecast.json?key=b2f6d3d0c410496db65154840212704&q=${location}&days=${days}`
    
            // - Fetch the url, wait for a response, store the response in memory
            let response = await fetch(url)
    
            // - Ask for the json-formatted data from the response, wait for the data, store it in memory
            let json = await response.json()
    
            // - Write the json-formatted data to the JavaScript console
            console.log(json)
    
            // - Store the returned location, current weather conditions, the forecast as three separate variables
            let interpretedLocation = json.location
            let currentWeather = json.current
            let dailyForecast = json.forecast.forecastday
    
            // Store a reference to the "current" element
            let currentElement = document.querySelector(`.current`)
    
            // Fill the current element with the location and current weather conditions
            currentElement.innerHTML = `
                <div class="text-center space-y-2">
                    <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
                    <div class="font-bold">
                    <img src="https:${currentWeather.condition.icon}" class="inline-block">
                    <span class="temperature">${currentWeather.temp_f}</span>° 
                    and
                    <span class="conditions">${currentWeather.condition.text}</span>
                    </div>
                </div>
            `
            // Store a reference to the "forecast" element
            let enteredDays = document.querySelector(`.forecast`)

            // Fill the entered days element with the user-entered days condition
            enteredDays.innerHTML = `
                <div class="text-center space-y-8">
                <div class="font-bold text-3xl">${days} Day Forecast</div>
            `
            if (days > 3) {
                // Store a reference to the current element
                let daysCheck = document.querySelector(`.current`)

                // If days enterd is outside of conditions return error message
                daysCheck.insertAdjacentHTML("beforebegin", `
                    <div class="text-center">
                        You are using the free weatherAPI.com version. Please enter a days value between 1 and 3 only!
                    </div>
                `)
            }
            // Loop through days entered to get forecast
            for (let i = 0; i < days; i++) {
                // Create a variable to store each day in the forecast
                let requestedForecast = dailyForecast[i]
                // Store a reference to the "forecast" element
                let forecast = document.querySelector(`.forecast`)

                // Fill the entered forecast values based on user-entered days condition
                forecast.insertAdjacentHTML(`beforeend`, `
                    <div class="text-center">
                        <img src="https:${requestedForecast.day.condition.icon}" class="mx-auto">
                        <h1 class="text-2xl text-bold text-gray-500">${requestedForecast.date}</h1>
                        <h2 class="text-xl">High ${requestedForecast.day.maxtemp_f}° – Low ${requestedForecast.day.mintemp_f}°</h2>
                        <p class="text-gray-500">${requestedForecast.day.condition.text}</h2>
                    </div>
                `)
            }
        }
    })
  })