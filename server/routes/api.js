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
const crypto = require("crypto")
const secretKey =
  "7c189339c715b42cc7ab928a6102bfdb36792794b3fc11497e1f19c923fa641f"

const getProductsFromShopify = async url => {
  let results = await axios.get(url)
  for (result of results.data.products) {
    let product = new Product({
      shopifyId: result.id,
      name: result.title,
      stages: { 1: {title: "Pressing" , steps : ["Make Sure you have all materials ready before you start the layup process",
     "Double check flex and graphic are correct",`Use mold : ${result.title ==="Atlas" ? 1 : result.title === `Aldous` ? 2 : 3}`]} ,2:{title : "CNC" , steps : [`Home the machine if it’s the first board of the day`,`Make sure you load the correct file to the controller`,`Touch off height sensor`,`Use mold : ${result.title ==="Atlas" ? 1 : result.title === `Aldous` ? 2 : 3}`] },
    3:{title: `Sanding`,steps : [`Make sure everything is silky smooth.
    `,`Check the wheel-wells closely`]}, 4 : {title : `Lacquer` ,steps : [`2 Layers on top`,`2 layers on bottom`]},5:{title: `Vaccum Bag` ,steps : [`Apply flex sticker`,`Place sticker pack and product booklet in bag`,`Vacuum + seal bag`]},
  6:{title: `Shipping`, steps : [`Make sure all order items are in the box`,`Print Shipping Label -> link/button`]} }
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
        const product = await Product.find({shopifyId : item.product_id})
        let address = result.shipping_address
        let order = new Order({
          shopifyId: result.id,
          itemId: item.id,
          costumerId: result.customer.id,
          price: parseInt(result.total_price),
          product: product[0]._id,
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

const validateWebhook = (req, res, next) => {
  generated_hash = crypto
    .createHmac("sha256", secretKey)
    .update(Buffer.from(req.rawbody))
    .digest("base64")
  if (generated_hash == req.headers["x-shopify-hmac-sha256"]) {
    next()
  } else {
    res.sendStatus(200)
    console.log("Not from Shopify!")
  }
}

router.get(`/orders/`, async (req, res) => {
  const orders = await Order.find({}).populate('product')
  res.send(orders)
})
router.get(`/customers/`, async (req, res) => {
  const customers = await Customer.find({}).populate('orders')
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

router.post("/webhooks/orders/create", validateWebhook, async (req, res) => {
  res.sendStatus(200)
  console.log("🎉 We got an order!")

  const result = await req.body
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
    await Customer.updateOne({ shopifyId: cust.id }, { orders: updatedOrders })
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
    console.log("saved")
  }
})

getProductsFromShopify(productsAPI)
getOrdersFromShopify(ordersAPI)
addEmployeesToDB(employees)
module.exports = router
