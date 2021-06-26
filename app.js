const express = require('express')
const app = express()
const restaurants = require('./restaurant.json')
const allrestaurant = restaurants.results
const port = 3000

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
// 主頁面
app.get('/', (req, res) => {
    res.render('index', { restaurants: allrestaurant })
})
// 搜尋
app.get('/search', (req, res) => {
    const searchWord = req.query.keyword.toLowerCase().trim()
    const searchRestaurant = allrestaurant.filter(restaurant =>
        restaurant.name.toLowerCase().trim().includes(searchWord))
    res.render('index', { restaurants: searchRestaurant })
})

app.get('/restaurants/:keyword', (req, res) => {
    const paramsId = req.params.keyword
    const clickRestaurant = allrestaurant.find(restaurant => restaurant.id.toString() === paramsId)
    res.render('show', { restaurant: clickRestaurant })
})

app.listen(port, () => {
    console.log(`The Express server is running on http://localhost:${port}`)
})