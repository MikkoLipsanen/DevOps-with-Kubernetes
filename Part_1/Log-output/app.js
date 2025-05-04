const { randomBytes } = require('node:crypto')

function randomString(length) {
  if (length % 2 !== 0) {
    length++
  }

  return randomBytes(length / 2).toString('hex')
}

const string = randomString(20)

setInterval(() => {
    const now = new Date().toISOString()
    console.log(now + ': ' + string)
}, 5000);
