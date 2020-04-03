const express = require("express")
const router = express.Router()
const axios = require(`axios`)
const Product = require("../models/Product")
const Order = require("../models/Order")
const Customer = require("../models/Customer")
const Board = require("../models/board")
const Admin = require("../models/admin")
const dotenv = require("dotenv")
  const mailer = require('./mailer')()


dotenv.config()
const ordersAPI = process.env.ordersAPI
const productsAPI = process.env.productsAPI

const shopify = function() {
  const getProductsFromShopify = async (url,adminId) => {
    let results = await axios.get(url)
    for (result of results.data.products) {
      const foundProduct = await Product.find({shopifyId : result.id})    
      if(foundProduct.length === 0){
        let product = new Product({
          shopifyId: result.id,
          name: result.title,
          adminId : adminId
        })
        await product.save()
        await Admin.findOneAndUpdate({_id : adminId},{$push : {products : product._id}})
      }
    }
  }
  const getOrdersFromShopify = async (url,adminId) => {
    const threeDays = 259200000
    let results = await axios.get(url)
    console.log(results.data)
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
            orders: [result.id],
            adminId : adminId
          })
          await customer.save()
          await Admin.findOneAndUpdate({_id : adminId},{$push : {customers : customer._id}})
        } else {
          updatedOrders = foundCustomer[0].orders.push(result.id)
          await Customer.updateOne(
            { shopifyId: cust.id },
            { orders: updatedOrders }
          )
        }

        for (let item of result.line_items) {
          const product = await Product.findOne({ shopifyId: item.product_id })
          const board = await Board.findOne({products : {$in : [`${product._id}`]}})
          let address = result.shipping_address
          let order = new Order({
            date: result.created_at,
            shopifyId: result.id,
            itemId: item.id,
            customerId: result.customer.id,
            price: parseInt(result.total_price),
            product: product._id,
            attributes: item.variant_title,
            inProcess: false,
            progress: 1,
            stageEmployees: { 1: "" },
            isComplete: false,
            isReadyToShip:false,
            shippingAddress: {
              address: address.address1,
              city: address.city,
              province: address.province,
              country: address.country,
              zip: address.zip,
              company: address.company,
              name: address.name,
              phone: address.phone
            },
            adminId : adminId
          })
          await order.save()
          if(board){ 
            await Board.updateOne({_id : board._id},{$push : {orders : order._id}})
          }
        }
        if(result.fulfillment_status != "fullfilled" && (new Date() -  Date.parse(result.created_at) < threeDays)){
          mailer.sendEmail(result.id)
        }
      }
    }
  }
  return { getOrdersFromShopify, getProductsFromShopify }
}

module.exports = shopify
