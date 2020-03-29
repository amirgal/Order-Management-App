const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    shopifyId: Number,
    name : String,
    stages : Object
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product

