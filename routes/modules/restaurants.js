const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 導向新增頁面
router.get('/new', (req, res) => {
    return res.render('new')
})

// 新增
router.post('/', (req, res) => {
    const name = req.body.name
    const name_en = req.body.name_en
    const category = req.body.category
    const image = req.body.image
    const location = req.body.location
    const phone = req.body.phone
    const google_map = req.body.google_map
    const rating = req.body.rating
    const description = req.body.description
    return Restaurant.create({
        name,
        name_en,
        category,
        image,
        location,
        phone,
        google_map,
        rating,
        description
    })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

//瀏覽單一餐廳detail
router.get('/:id', (req, res) => {
    const paramsId = req.params.id
    Restaurant.findById(paramsId)
        .lean()
        .then(restaurant => res.render('detail', { restaurant }))
        .catch(error => console.log(error))
})

// 導向編輯頁面
router.get('/:id/edit', (req, res) => {
    const paramsId = req.params.id
    Restaurant.findById(paramsId)
        .lean()
        .then((restaurant) => res.render('edit', { restaurant }))
        .catch(error => console.log(error))
})

// 修改資料
router.put('/:id', (req, res) => {
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
// 刪除
router.delete('/:id', (req, res) => {
    const id = req.params.id
    return Restaurant.findById(id)
        .then(restaurant => restaurant.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


module.exports = router