
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes')
const methodOverride = require('method-override')

require('./config/mongoose')
const app = express()
const port = 3000

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