const mongoose = require("mongoose")
const Schema = mongoose.Schema

const boardSchema = new Schema({
  name: String,
  products: Array,
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  stages: Array,
  adminId : String
})

const Board = mongoose.model("Board", boardSchema)
module.exports = Board
