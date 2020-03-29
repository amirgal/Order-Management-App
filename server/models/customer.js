const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
    shopifyId : Number,
    name : String,
    email : String,
    phone: String,
    orders : [{type: Schema.Types.ObjectId, ref : 'Order'}]
})

const Customer = mongoose.model("Customer", customerSchema)
module.exports = Customer

