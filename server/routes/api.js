const express = require("express")
const router = express.Router()
const axios = require(`axios`)
const shopify = require("./shopify")()
const Product = require("../models/Product")
const Order = require("../models/Order")
const Customer = require("../models/Customer")
const Employee = require("../models/employee")
const Board = require('../models/board');
const Admin = require('../models/admin');



router.post('/board', async(req,res) => {
  const newBoard = req.body 
  const board = new Board(newBoard)
  let orders = []
  await Admin.findOneAndUpdate({_id : board.adminId},{$push : {boards : board._id}})
  for(let prodId of board.products){
    await Product.updateOne({_id:prodId}, {boardId:board._id})
    const prodOrdersIds = await Order.find({product: prodId}).select('_id')
    orders = [...orders,...prodOrdersIds]
  }
  board.orders = orders
  await board.save()
  const savedBoard = await Board.findOne({_id: board._id}).populate({
    path:'orders',
    populate:{
      path:'product'
    }
  })

  res.send(savedBoard)
})

router.put('/board',async (req,res) => {
  const updated = req.body
  const response =  await Board.updateOne({_id : updated._id},updated,{new : true})
  res.send(response)
})

// router.get(`/boards/`, async (req, res) => {
//   const boards = await Board.find({}).populate({
//     path:'orders',
//     populate:{
//       path:'product'
//     }
//   })
//   res.send(boards)
// })


// router.get(`/completed/`, async (req, res) => {
//   const orders = await Order.find({isComplete : true}).populate("product")
//   res.send(orders)
// }) 

// router.get(`/customers/`, async (req, res) => {
//   const customers = await Customer.find({})
//   res.send(customers)
// })
// router.get(`/employees/`, async (req, res) => {
//   const employees = await Employee.find({})
//   res.send(employees)
// })
// router.get(`/products/`, async (req, res) => {
//   const products = await Product.find({})
//   res.send(products)
// })
router.put(`/order/`, async (req, res) => {
  const order = req.body
  await Order.updateOne({ _id: order._id }, order, {
    new: true
  })
  res.end()
})

router.post("/employees/", async (req, res) => {
  const {employee,adminId} = req.body
  let found = await Employee.find({ name: employee.name })
  if (found.length === 0) {
    let newEmployee = new Employee({
      name: employee.name,
      isActive: employee.isActive,
      adminId : adminId
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

const queryAdminData = async (adminId) => {
  const adminData = await Admin.find({_id : adminId}).populate({
    path : 'boards' ,populate : {
      path : 'orders',populate : {
        path : 'product'
      }
    }
  }).populate('employees').populate('products').populate('customers')
  return adminData
}

router.get('/adminData/:adminId',async (req,res) => {
  const adminData = await queryAdminData(req.params.adminId)
  res.send(adminData)
})

router.post("/sync/", async (req, res) => {
  const {ordersUrl,productsUrl,adminId} = req.body
  await shopify.getProductsFromShopify(productsUrl,adminId)
  await shopify.getOrdersFromShopify(ordersUrl,adminId)
  // const products = await Product.find({})
  // const boards = await Board.find({}).populate({ path:'orders',
  // populate:{
  //   path:'product'
  // }})
  // const employees = await Employee.find({})
  const adminData = await queryAdminData(adminId)
  res.send(adminData)
})

module.exports = router
