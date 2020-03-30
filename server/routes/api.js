const express = require("express")
const router = express.Router()
const axios = require(`axios`)
const Product = require("../models/Product")
const Order = require("../models/Order")
const Customer = require("../models/Customer")
const Employee = require("../models/Employee")

const employees = ["Nadav", "Amir", "Alon", "Ron"]

const addEmployeesToDB = async arr => {
  for (let e of arr) {
    let employee = new Employee({
      name: e
    })
    await employee.save()
  }
}

router.get(`/orders/`, async (req, res) => {
  const orders = await Order.find({})
  res.send(orders)
})
router.get(`/customers/`, async (req, res) => {
  const customers = await Customer.find({})
  res.send(customers)
})
router.get(`/employees/`, async (req, res) => {
  const employees = await Employee.find({})
  res.send(employees)
})
router.get(`/products/`, async (req, res) => {
  const products = await Product.find({})
  res.send(products)
})
router.put(`/order/`, async (req, res) => {
  const order = req.body
  await Order.updateOne({ _id: order._id }, order, {
    new: true
  })
})

addEmployeesToDB(employees)
module.exports = router
