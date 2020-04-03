import React, { useState } from "react"
import { inject, observer } from "mobx-react"
import { Button, TextField } from "@material-ui/core"
import { useParams } from "react-router"
import TrackingBar from "./OrderTracker"

const Tracker = inject("generalStore")(
  observer(props => {
    const { id } = useParams()
    const [orderId, setOrderId] = useState(id ? id : "")
    const [activeStep, setActiveStep] = useState(0)
    const [orderObj, setOrderObj] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [trackingNum, setTrackingNum] = useState(null)
    const handleChange = e => {
      setOrderId(e.target.value)
    }
    const customers = props.generalStore.customers
    const findOrder = () => {
      const orders = props.generalStore.orders
      let order = orders.find(o => o.shopifyId === orderId)
      if (order) {
        let foundCustomer = customers.find(c => c.shopifyId === order.customerId)
        setCustomer(foundCustomer)
        setOrderObj(order)
        setActiveStep(order.progress)
        setOrderId("")
      } else {
        setOrderId("")
        alert("Invalid Order Number")
      }
    }

    // useEffect(() => {
    //   if (id) {
    //     findOrder()
    //   }
    // }, [])

    return (
      <div className="tracker_page">
        <TextField
          className="trackInput"
          id="outlined-basic"
          label="Order Number"
          variant="outlined"
          value={orderId}
          onChange={handleChange}
        />
        <Button id="trackButton" onClick={findOrder} variant="contained">
          Track Order
        </Button>
        <div className="activeStep">
          {activeStep > 0 ? (
            <TrackingBar
              activeStep={activeStep}
              order={orderObj}
              customer={customer}
            />
          ) : null}
        </div>
      </div>
    )
  })
)

export default Tracker
