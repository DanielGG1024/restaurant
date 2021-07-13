const mongoose = require('mongoose')

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

module.exports = db