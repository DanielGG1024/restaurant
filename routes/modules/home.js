const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 主頁面
router.get('/', (req, res) => {
    Restaurant.find()
        .lean()
        .sort({ name: 'asc' })
        .then(restaurants => res.render('index', { restaurants }))
        .catch(error => console.error(error))
})

module.exports = router