const express = require("express")
const router = express.Router()
const axios = require(`axios`)
const Product = require("../models/Product")
const Order = require("../models/Order")
const Customer = require("../models/Customer")
const Employee = require("../models/Employee")
const ordersAPI =
  "https://c899d30fc9a903416c913a2fee03110e:002c2c5df36681b94386e74fce120092@omteststore.myshopify.com/admin/api/2020-01/orders.json"
const productsAPI =
  "https://c899d30fc9a903416c913a2fee03110e:002c2c5df36681b94386e74fce120092@omteststore.myshopify.com/admin/api/2020-01/products.json"

const getProductsFromShopify = async url => {
  let results = await axios.get(url)
  for (result of results.data.products) {
    let product = new Product({
      shopifyId: result.id,
      name: result.title,
      stages: { 1: null }
    })
    await product.save()
  }
}
const getOrdersFromShopify = async url => {
  let results = await axios.get(url)
  for (let result of results.data.orders) {
    const foundOrder = await Order.find({ shopifyId: result.id })
    if (foundOrder.length == 0) {
      const cust = result.customer
      const foundCustomer = await Customer.find({ shopifyId: cust.id })
      if (foundCustomer.length == 0) {
        let customer = new Customer({
          shopifyId: cust.id,
          name: cust.first_name + " " + cust.last_name,
          email: cust.email,
          phone: cust.default_address.phone,
          orders: [result.id]
        })
        await customer.save()
      } else {
        updatedOrders = foundCustomer[0].orders.push(result.id)
        await Customer.updateOne(
          { shopifyId: cust.id },
          { orders: updatedOrders }
        )
      }

      for (let item of result.line_items) {
        let address = result.shipping_address
        let order = new Order({
          shopifyId: result.id,
          itemId: item.id,
          costumerId: result.customer.id,
          price: parseInt(result.total_price),
          product: item.product_id,
          attributes: item.variant_title,
          inProcess: false,
          progress: 1,
          stageEmployees: { 1: "" },
          isComplete: false,
          shippingAdress: {
            address: address.address1,
            city: address.city,
            province: address.province,
            country: address.country,
            zip: address.zip,
            company: address.company,
            name: address.name,
            phone: address.phone
          }
        })
        await order.save()
      }
    }
  }
}

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
  const orders = await Customer.find({})
  res.send(orders)
})
router.get(`/employees/`, async (req, res) => {
  const orders = await Employee.find({})
  res.send(orders)
})
router.get(`/products/`, async (req, res) => {
  const orders = await Product.find({})
  res.send(orders)
})

router.put(`/order/`, async (req, res) => {
  const order = req.body
  await Order.updateOne({ _id: order._id }, order, {
    new: true
  })
})

// getProductsFromShopify(productsAPI)
// getOrdersFromShopify(ordersAPI)
// addEmployeesToDB(employees)
module.exports = router
