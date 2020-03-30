const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
  shopifyId: Number,
  itemId: Number,
  costumerId: Number,
  price: Number,
  product: Number,
  attributes: String,
  comment: String,
  shippingAdress: Object,
  inProcess: Boolean,
  progress: Number,
  stageEmployees: Object,
  isComplete: Boolean,
  date: Date
})

const Customer = mongoose.model("Order", orderSchema)
module.exports = Customer
