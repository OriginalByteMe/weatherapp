const image = document.querySelectorAll('img')

async function getGif () {
  console.log('Image', image)
  const gif = await fetch('https://api.giphy.com/v1/gifs/translate?api_key=i9BXyHisgULb1AirOHfSWrGE7NGOoJfc&s=cats', { mode: 'cors' })
  const gifData = await gif.json()

  image.forEach((img) => { img.src = gifData.data.images.original.url })
}

getGif()
