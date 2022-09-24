const words = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
const max = 62
const min = 1

function shortener()  {
  let shortener = ''
  for (let i = 1; i <= 5; i ++) {
    const randomIndex = Math.floor(Math.random() * (max - min + 1) + min )
    const array = words[randomIndex]
    shortener += array
  }
  return shortener
}

module.exports = shortener