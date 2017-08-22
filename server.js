const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const APP_PORT = 3000

app.use(bodyParser.json({limit: '1mb'}))    //body-parser 解析json格式数据
app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
  extended: true
}))
app.use('/demo', express.static('demo'))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'demo', 'index.html'))
})
app.post('/test', (req, res) => {
  res.send({"success":"post-test"})
})
app.get('/test', (req, res) => {
  res.send("success")
})

app.listen(APP_PORT, function(req, res) {
  console.log('Listening at '+APP_PORT)
})