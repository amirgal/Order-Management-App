const express = require("express")
var bodyParser = require("body-parser")
const api = require("./server/routes/api")
const app = express()
const mongoose = require("mongoose")

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
        if (req.url.startsWith("/webhooks")) {
          req.rawbody = buf
        }
      }
    })
  )

app.use("/", api)

const port = 4000
app.listen(port, function() {
  console.log(`Running server on port ${port}`)
})
