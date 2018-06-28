var express = require('express')
var app = express()
var cors = require('cors')
const bodyParser = require('body-parser')
var fs = require('fs')
const path = require('path')
var Chance = require('chance');
var chance = new Chance();
const restaurantsJson = require('./json/restaurants.json')
console.log('baaa server is starting')

var server = app.listen(3001, () => {
  console.log('listening...')
})
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'json/restaurants.json')))

app.get('/restaurants', (req, res) => {
  res.json(chance.pickone(restaurantsJson.restaurants))
})

app.post('/restaurants', (req, res, err) => {
  fs.readFile('./json/restaurants.json', 'utf8', function readFileCallback(err, data) {
      if (err) console.log(err)
      obj = JSON.parse(data)
      console.log(req.body)
      obj.restaurants.push(req.body)
      json = JSON.stringify(obj)
      fs.writeFileSync('./json/restaurants.json', json, 'utf8', function () {
          if(err) console.log(err)
          console.log('restaurants.json saved')
      })
  })

  res.send(console.log('hi'))
})
