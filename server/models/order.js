const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    shopifyId : Number,
    costumerId : Number,
    price : Number,
    product : {type: Schema.Types.ObjectId, ref : 'Product'},
    attributes : String,
    graphic : String,
    comment : String,
    inProcess : Boolean,
    progress : Number,
    stageEmployees : {}
})

const Customer = mongoose.model("Order", orderSchema)
module.exports = Customer










