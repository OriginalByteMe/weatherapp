const image = document.querySelector('img')
const formButton = document.querySelector('#submitForm')
const cityInput = document.querySelector('#city')
const unitInput = document.querySelector('#unit')
const title = document.querySelector('.forecast-title')
const weatherType = document.querySelector('.weather-type')
const highTemp = document.querySelector('.high-temp')
const lowTemp = document.querySelector('.low-temp')

async function getGif (searchTerm) {
  console.log('Image', searchTerm)
  const gif = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=i9BXyHisgULb1AirOHfSWrGE7NGOoJfc&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`, { mode: 'cors' })
  const gifData = await gif.json()

  image.src = gifData.data[0].images.original.url
}
async function getWeatherData (city, unit) {
  console.log('Getting data for', city)
  const system = unit === 'fahrenheit' ? 'imperial' : 'metric'
  const apiKey = '77e8b9568c85ad4082fa27e98e49fe5a'
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=${apiKey}`, { mode: 'cors', method: 'GET' })
    const data = await response.json()
    console.log('data:', data)
    await getGif(data.weather[0].main)
    updateUI(city, data.weather[0].main, data.main.temp_max, data.main.temp_min, unit)
    cityInput.innerHTML = ''
  } catch (error) {
    console.error(error)
  }
}

const updateUI = (location, weather, TempHigh, TempLow, unit) => {
  title.innerHTML = `Forecast for ${location}`
  weatherType.innerHTML = `It is currently ${weather}!`
  console.log(location, weather, highTemp, lowTemp, unit)
  if (unit === 'celsius') {
    highTemp.innerHTML = `Max temp: ${TempHigh}°C`
    lowTemp.innerHTML = `Min temp: ${TempLow}°C`
  } else {
    highTemp.innerHTML = `Max temp: ${TempHigh}°F`
    lowTemp.innerHTML = `Min temp: ${TempLow}°F`
  }
}

formButton.addEventListener('click', (e) => {
  e.preventDefault()
  getWeatherData(cityInput.value, unitInput.value)
})

getWeatherData('London', 'celsius')
