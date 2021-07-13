const Restaurant = require('../restaurant')
const restaurantsJson = require('./restaurant.json')
const allrestaurant = restaurantsJson.results

const db = require('../../config/mongoose')

db.once('open', () => {
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
        }).then(() => {
            db.close()
        })
    })
    console.log('done')
})