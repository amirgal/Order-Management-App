const express = require("express")
const router = express.Router()
const axios = require(`axios`)
const shopify = require("./shopify")()
const Product = require("../models/Product")
const Order = require("../models/Order")
const Customer = require("../models/Customer")
const Employee = require("../models/employee")
const Board = require('../models/board');

router.get(`/boards/`, async (req, res) => {
  const boards = await Board.find({}).populate({
    path:'orders',
    populate:{
      path:'product'
    }
  })
  res.send(boards)
})

router.post('/board', async(req,res) => {
  const newBoard = req.body 
  const board = new Board(newBoard)
  let orders = []

  for(let prodId of board.products){
    await Product.updateOne({_id:prodId}, {boardId:board._id})
    const prodOrdersIds = await Order.find({product: prodId}).select('_id')
    orders = [...orders,...prodOrdersIds]
  }
  board.orders = orders
  await board.save()
  res.send(board)
})

router.put('/board',async (req,res) => {
  const updated = req.body
  const response =  await Board.updateOne({_id : updated._id},updated,{new : true})
  res.send(response)
})

router.get(`/orders/`, async (req, res) => {
  const orders = await Order.find({}).populate("product")
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
  res.end()
})

router.post("/employees/", async (req, res) => {
  const employee = req.body
  let found = await Employee.find({ name: employee.name })
  if (found.length === 0) {
    let newEmployee = new Employee({
      name: employee.name,
      isActive: employee.isActive
    })
    await newEmployee.save()
    const employees = await Employee.find({})
    res.send(employees)
  } else {
    res.send("Please select a different name")
  }
})
router.put("/employees/", async (req, res) => {
  const employee = req.body
  await Employee.updateOne({ name: employee.name }, employee)
  const employees = await Employee.find({})
  res.send(employees)
})

router.post("/sync/", async (req, res) => {
  const productsUrl = req.body.productsUrl
  const ordersUrl = req.body.ordersUrl
  await shopify.getProductsFromShopify(productsUrl)
  await shopify.getOrdersFromShopify(ordersUrl)
  const products = await Product.find({})
  const orders = await Order.find({})
  const boards = await Board.find({})
  const employees = await Employee.find({})
  res.send({ products, orders, employees })
})

module.exports = router
