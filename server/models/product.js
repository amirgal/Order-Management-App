const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name : String,
    stages : {}
})

const Product = mongoose.model("Product", productSchema)
module.exports = Product

