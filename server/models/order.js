const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
  shopifyId: Number,
  itemId: Number,
  customerId: Number,
  boardId:String,
  price: Number,
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  attributes: String,
  comment: String,
  shippingAddress: Object,
  inProcess: Boolean,
  progress: Number,
  stageEmployees: Object,
  isReadyToShip: Boolean,
  isComplete: Boolean,
  date: Date,
  endDate:Date
})

const Order = mongoose.model("Order", orderSchema)
module.exports = Order
