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

const shopify = function() {
  const getProductsFromShopify = async (adminId) => {
    const admin = await Admin.findOne({_id : adminId})
    const productsUrl = `https://${admin.apiKey}:${admin.storePassword}@${admin.storeName}.myshopify.com/admin/api/2020-01/products.json`;
    let results = await axios.get(productsUrl)
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
  const getOrdersFromShopify = async (adminId) => {
    const admin = await Admin.findOne({_id : adminId})
    const ordersUrl = `https://${admin.apiKey}:${admin.storePassword}@${admin.storeName}.myshopify.com/admin/api/2020-01/orders.json`;
    const threeDays = 259200000
    let results = await axios.get(ordersUrl)
    
    for (let result of results.data.orders) {
      const foundOrder = await Order.find({ shopifyId: result.id })
      if (foundOrder.length == 0) {
        const cust = result.customer
        const foundCustomer = await Customer.findOne({ shopifyId: cust.id })
        if (!foundCustomer) {
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
          foundCustomer.orders.push(result.id)
          updatedOrders = foundCustomer.orders
          await Customer.findOneAndUpdate(
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
              phone: address.phone,
              courier:result.shipping_lines[0].title
            },
            adminId : adminId,
            locationId : item.origin_location.id
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

  const fulfill = async (adminId,shopifyId) => {
    const admin = await Admin.findOne({_id : adminId})
    const url = `https://${admin.apiKey}:${admin.storePassword}@${admin.storeName}.myshopify.com/admin/api/2020-04/orders/${shopifyId}/fulfillments.json`
    try{
    const response = await axios.post(url, {
          "fulfillment": {
            "location_id": 44014174340,
            "notify_customer": true
          }
        }
  )
      }catch(error){
        console.log('already fullfilled');
        
      }
}

  return { getOrdersFromShopify, getProductsFromShopify ,fulfill }
}

module.exports = shopify
