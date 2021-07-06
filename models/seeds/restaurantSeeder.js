const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantsJson = require('../../restaurant.json')
const allrestaurant = restaurantsJson.results
mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})

db.once('open', () => {
    console.log('mongodb connceted!')
    allrestaurant.forEach((item) => {
        Restaurant.create({
            name: item.name,
            name_en: item.name_en,
            category: item.category,
            image: item.image,
            location: item.location,
            phone: item.phone,
            google_map: item.google_map,
            rating: item.rating,
            description: item.description
        })
    })
    console.log('done')
})