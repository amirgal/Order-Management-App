const express = require("express")
const router = express.Router()
const axios = require(`axios`)
const Product = require("../models/Product")
const Order = require("../models/Order")
const Customer = require("../models/Customer")
const dotenv = require("dotenv")
dotenv.config()
const ordersAPI = process.env.ordersAPI
const productsAPI = process.env.productsAPI

const shopify = function() {
  const getProductsFromShopify = async url => {
    let results = await axios.get(url)
    for (result of results.data.products) {
      let product = new Product({
        shopifyId: result.id,
        name: result.title
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
          const product = await Product.find({ shopifyId: item.product_id })
          let address = result.shipping_address
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
        }
      }
    }
  }
  return { getOrdersFromShopify, getProductsFromShopify }
}
//getProductsFromShopify(productsAPI)
//  getOrdersFromShopify(ordersAPI)
module.exports = shopify
