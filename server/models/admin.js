const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminSchema = new Schema({
  username: String,
  password: String,
  email:String,
  storePassword:String,
  storeName:String,
  secretKey:String,
  apiKey:String,
  boards : [{ type: Schema.Types.ObjectId, ref: 'Board' }],
  employees : [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
  customers : [{ type: Schema.Types.ObjectId, ref: 'Customer' }],
  products : [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  email : String,
})

const Admin = mongoose.model("Admin", adminSchema)
module.exports = Admin
