const express = require('express')
const app = express()
const path = require('path')

const APP_PORT = 3000

app.use('/demo', express.static('demo'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'demo', 'index.html'))
})

app.listen(APP_PORT, function(req, res) {
  console.log('Listening at '+APP_PORT)
})