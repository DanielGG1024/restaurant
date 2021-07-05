const express = require('express')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const bodyParser = require('body-parser')
const app = express()

mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

const restaurants = require('./restaurant.json')
const allrestaurant = restaurants.results
const port = 3000

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
// app.use(bodyParser.urlencoded({ extended: true }))

// 主頁面
app.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
})
// 搜尋
app.get('/search', (req, res) => {
    const searchWord = req.query.keyword.toLowerCase().trim()
    const searchRestaurant = allrestaurant.filter(restaurant =>
        restaurant.name.toLocaleLowerCase().trim().includes(searchWord) ||
        restaurant.category.trim().includes(searchWord))
    res.render('index', { restaurants: searchRestaurant })
})

app.get('/restaurants/:keyword', (req, res) => {
    const paramsId = req.params.keyword
    Restaurant.findById(paramsId)
              .lean()
              .then(restaurant => res.render('show',{restaurant}))
              .catch(error =>console.log('error'))

    // const clickRestaurant = allrestaurant.find(restaurant => restaurant.id.toString() === paramsId)
    // res.render('show', { restaurant: clickRestaurant })
})

app.listen(port, () => {
    console.log(`The Express server is running on http://localhost:${port}`)
})