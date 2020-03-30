const express = require("express")
const router = express.Router()
const axios = require(`axios`)
const shopify = require('./shopify')()
const Product = require("../models/Product")
const Order = require("../models/Order")
const Customer = require("../models/Customer")
const Employee = require("../models/Employee")

const employees = ["Nadav", "Amir", "Alon", "Ron"]

const addEmployeesToDB = async arr => {
  for (let e of arr) {
    let employee = new Employee({
      name: e,
      isActive : true
    })
    await employee.save()
  }
}

router.get(`/orders/`, async (req, res) => {
  const orders = await Order.find({}).populate('product')
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

router.post('/employees/',async (req,res) => {
  const employee = req.body
  let found = await Employee.find({name : employee.name})
  if(found.length === 0){
    let newEmployee = new Employee({name : employee.name , isActive : employee.isActive})
    await newEmployee.save()
    const employees = await Employee.find({})
    res.send(employees)
  }else{
    res.send('Please select a different name')
  }
})
router.put('/employees/' ,async (req,res) => {
  const employee = req.body
  await Employee.updateOne({name : employee.name}, employee)
  const employees = await Employee.find({})
  res.send(employees)
})

router.post('/sync/',async (req,res) =>{
  const productsUrl = req.body.productsUrl
  const ordersUrl = req.body.ordersUrl
  await shopify.getProductsFromShopify(productsUrl)
  await shopify.getOrdersFromShopify(ordersUrl)
  const products =await Product.find({})
  const orders = await Order.find({})
  const employees = await Employee.find({})
  res.send({products,orders,employees})
  
})

// addEmployeesToDB(employees)
module.exports = router
