const express = require("express")
const router = express.Router()
const axios = require(`axios`)
const shopify = require("./shopify")()
const Product = require("../models/Product")
const Order = require("../models/Order")
const Customer = require("../models/Customer")
const Employee = require("../models/employee")
const Board = require("../models/board")
const Admin = require("../models/admin")

router.post("/board", async (req, res) => {
  const newBoard = req.body
  const board = new Board(newBoard)
  let orders = []
  await Admin.findOneAndUpdate(
    { _id: board.adminId },
    { $push: { boards: board._id } }
  )
  for (let prodId of board.products) {
    await Product.updateOne({ _id: prodId }, { boardId: board._id })
    const prodOrdersIds = await Order.find({ product: prodId }).select("_id")
    orders = [...orders, ...prodOrdersIds]
  }
  board.orders = orders
  await board.save()
  const savedBoard = await Board.findOne({ _id: board._id }).populate({
    path: "orders",
    populate: {
      path: "product",
    },
  })

  res.send(savedBoard)
})

router.put("/board", async (req, res) => {
  const updated = req.body
  const response = await Board.updateOne({ _id: updated._id }, updated, {
    new: true,
  })
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
router.get(`/singleOrder/:id`, async (req, res) => {
  const id = req.params.id
  const singleOrder = await Order.findOne({ shopifyId: id })
  res.send(singleOrder)
})
router.get(`/singleCustomer/:id`, async (req, res) => {
  const id = req.params.id
  const singleCustomer = await Customer.findOne({ shopifyId: id })
  res.send(singleCustomer)
})
router.put(`/order/`, async (req, res) => {
  const order = req.body
  await Order.updateOne({ _id: order._id }, order, {
    new: true,
  })
  res.end()
})

router.post("/employees/", async (req, res) => {
  const employee = req.body
  let found = await Employee.find({
    name: employee.name,
    adminId: employee.adminId,
  })
  if (found.length === 0) {
    let newEmployee = new Employee(employee)
    await newEmployee.save()
    await Admin.findOneAndUpdate(
      { _id: employee.adminId },
      { $push: { employees: newEmployee._id } }
    )
    const employees = await Employee.find({ adminId: employee.adminId })
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
  const adminData = await Admin.findOne({ _id: adminId })
    .populate({
      path: "boards",
      populate: {
        path: "orders",
        populate: {
          path: "product",
        },
      },
    })
    .populate("employees")
    .populate("products")
    .populate("customers")
  return adminData
}

router.get("/getAdminData/:adminId", async (req, res) => {
  const adminData = await queryAdminData(req.params.adminId)

  res.send(adminData)
})

router.post("/sync/", async (req, res) => {
  const { ordersUrl, productsUrl, adminId } = req.body
  await shopify.getProductsFromShopify(productsUrl, adminId)
  await shopify.getOrdersFromShopify(ordersUrl, adminId)
  // const products = await Product.find({})
  // const boards = await Board.find({}).populate({ path:'orders',
  // populate:{
  //   path:'product'
  // }})
  // const employees = await Employee.find({})
  const adminData = await queryAdminData(adminId)
  res.send(adminData)
})

router.post("/user", async function (req, res) {
  const user = req.body
  const response = await Admin.find({ username: user.username })
  const data = { userId: null, message: "" }
  if (response.length === 0) {
    data.message = "Wrong username or password"
  } else if (response[0].password === user.password) {
    data.userId = response[0]._id
  } else {
    data.message = "Wrong username or password"
  }
  res.send(data)
})

router.post("/newuser", async function (req, res) {
  const user = req.body //username and pass
  const newUser = new Admin(user)
  await newUser.save()
  res.send(newUser._id)
})

module.exports = router
