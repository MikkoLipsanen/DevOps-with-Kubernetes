const path = require('path')
const fs = require('node:fs')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'now.txt')

setInterval(() => {
    const now = new Date().toISOString()
    fs.writeFile(filePath, now, err => {
      if (err) {
        console.error(err);
      } 
    })
}, 5000)