const Product = require("../models/Product")
const Order = require("../models/Order")
const Customer = require("../models/Customer")
const Board = require("../models/board")
const nodemailer = require('nodemailer');

const mailer = function(){


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ourproductionline@gmail.com',
      pass: 'hackaton2!'
    }
  })
  
    const createMailOptions = async (shopifyOrderId) => {
        const orders = await Order.find({shopifyId : shopifyOrderId}).populate('product')
        const customer = await Customer.findOne({shopifyId : orders[0].customerId})
        let subjectStr = `Your order from $shopName$ is being processed`
        let textStr = 'Hello ' + customer.name +  '. Order number ' +shopifyOrderId + ' with item' 
      if(orders.length > 1){
        textStr += 's : '
        for(let order of orders){
          textStr += '' + order.product.name + ', '
        }
      }else{
        textStr += ' : ' + orders[0].product.name
      }
      textStr += `.Has been recived at our shop and is in the work! You can track your order via this link : http://localhost:4001/tracking/${shopifyOrderId}`
      return {
      from: 'ourproductionline@gmail.com',
      to: customer.email,
      subject: subjectStr,
      text: textStr
      }
    }
  
    const sendEmail = async (shopifyOrderId) => {
      const mailOptions = await createMailOptions(shopifyOrderId)
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
    }

    return {sendEmail}
}
    
module.exports = mailer
  