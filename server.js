const express = require("express")
var bodyParser = require("body-parser")
const api = require("./server/routes/api")
const shopify = require("./server/routes/shopify")
const webhook = require("./server/routes/webhook")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const server = require('http').createServer(app)
const io = require('socket.io')(server);

const port = process.env.port || 4000

mongoose.connect("mongodb://localhost/OrderManager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  )
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  bodyParser.json({
    verify: function(req, res, buf) {
      if (req.url.startsWith("/webhook")) {
        req.rawbody = buf
      }
    }
  })
)
app.use("/api", api)
app.use("/shopify", shopify)

app.use(function(req, res, next) {
  req.io = io;
  next();
});

app.use("/webhook", webhook)
 
server.listen(port, function() {
  console.log(`Running server on port ${port}`)
  
})
