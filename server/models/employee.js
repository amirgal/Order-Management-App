const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    name : String
})

const Employee = mongoose.model("Employee", employeeSchema)
module.exports = Employee

