const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
// 搜尋
router.get('/', (req, res) => {
    const searchWord = req.query.keyword.trim().toLowerCase()
    Restaurant.find()
        .lean()
        .then((restaurants) => {
            if (searchWord) {
                restaurants = restaurants.filter((restaurant) =>
                    restaurant.name.toLowerCase().includes(searchWord) ||
                    restaurant.category.includes(searchWord))
            }
            res.render('index', { restaurants, searchWord })
        })
        .catch((error) => console.error(error))
})

module.exports = router