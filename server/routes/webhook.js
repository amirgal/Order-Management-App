const express = require("express")
const router = express.Router()
const Order = require("../models/Order")
const Customer = require("../models/Customer")
const Product = require("../models/Product")
const dotenv = require("dotenv")
dotenv.config()
const secretKey = process.env.secretKey
const crypto = require("crypto")

const validateWebhook = (req, res, next) => {
  generated_hash = crypto
    .createHmac("sha256", secretKey)
    .update(Buffer.from(req.rawbody))
    .digest("base64")
  if (generated_hash == req.headers["x-shopify-hmac-sha256"]) {
    res.sendStatus(200)
    next()
  } else {
    res.sendStatus(200)
    console.log("Not from Shopify!")
  }
}

router.post("/orders/create", validateWebhook, async (req, res) => {
  console.log("We got an order!")

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
    const product = await Product.find({shopifyId : item.product_id})
    let order = new Order({
      date: result.created_at,
      shopifyId: result.id,
      itemId: item.id,
      customerId: result.customer.id,
      price: parseInt(result.total_price),
      product: product[0]._id,
      attributes: item.variant_title,
      inProcess: false,
      progress: 1,
      stageEmployees: { 1: "" },
      isComplete: false,
      shippingAddress: {
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
    console.log("Saved to DB")
  }
})

module.exports = router
