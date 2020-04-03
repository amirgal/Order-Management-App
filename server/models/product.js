const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    shopifyId: Number,
    name : String,
    boardId: String,
    adminId : String
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product

