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
const restaurant = require('./models/restaurant')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

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
//瀏覽單一餐廳detail
app.get('/restaurants/:id', (req, res) => {
    const paramsId = req.params.id
    Restaurant.findById(paramsId)
        .lean()
        .then(restaurant => res.render('detail', { restaurant }))
        .catch(error => console.log(error))
})
// 導向編輯頁面
app.get('/restaurants/:id/edit', (req, res) => {
    const paramsId = req.params.id
    Restaurant.findById(paramsId)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
})
// 修改資料
app.post('/restaurants/:id/edit', (req, res) => {
    const id = req.params.id
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const image = req.body.image
    const location = req.body.location
    const phone = req.body.phone
    const google_map = req.body.google_map
    const rating = req.body.rating
    const description = req.body.description
    return Restaurant.findById(id)
        .then(restaurant => {
            restaurant.name = name
            restaurant.name_en = name_en
            restaurant.category = category
            restaurant.image = image
            restaurant.location = location
            restaurant.phone = phone
            restaurant.google_map = google_map
            restaurant.rating = rating
            restaurant.description = description
            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${id}`))
        .catch(error => console.log(error))
})
app.post('/restaurants/:id/delete', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(Restaurant => Restaurant.remove())
        .then(()=>res.redirect('/'))
        .catch(error=>console.log(error))
})

app.listen(port, () => {
    console.log(`The Express server is running on http://localhost:${port}`)
})