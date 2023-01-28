const image = document.querySelectorAll('img')
const formButton = document.querySelector('#submitForm')
const cityInput = document.querySelector('#city')
const unitInput = document.querySelector('#unit')

async function getGif () {
  console.log('Image', image)
  const gif = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=i9BXyHisgULb1AirOHfSWrGE7NGOoJfc&s=cats', { mode: 'cors' })
  const gifData = await gif.json()

  image.forEach((img) => { img.src = gifData.data.images.original.url })
}

async function getWeatherData (city, unit) {
  console.log('Getting data for', city)
  const system = unit === 'Fahrenheit' ? 'standard' : 'metric'
  const apiKey = '77e8b9568c85ad4082fa27e98e49fe5a'
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=${apiKey}`, { mode: 'cors', method: 'GET' })
    const data = await response.json()
    console.log('data:', data)
    cityInput.innerHTML = ''
    unitInput.innerHTML = ''
  } catch (error) {
    console.error(error)
  }
}

formButton.addEventListener('click', (e) => {
  e.preventDefault()
  getWeatherData(cityInput.value, unitInput.value)
})

// getGif()
