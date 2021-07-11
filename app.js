const express = require('express')
// 載入mongoose
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const routes = require('./routes')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const port = 3000
// 使用mongoose的connect方法 與Mongodb建立連線
mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true, useUnifiedTopology: true })
// 取的資料庫連線狀態
const db = mongoose.connection

// 監聽error有沒有發生
db.on('error', () => {
    console.log('mongodb error!')
})
// 監聽open有沒有發生
db.once('open', () => {
    console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

// 監聽
app.listen(port, () => {
    console.log(`The Express server is running on http://localhost:${port}`)
})