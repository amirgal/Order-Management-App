import React, { useState, useEffect } from "react"
import { inject, observer } from "mobx-react"
import { Button, TextField } from "@material-ui/core"
import TrackingBar from "./OrderTracker"

const Tracker = inject("ordersStore")(
  observer(props => {
    const [orderId, setOrderId] = useState("")
    const [activeStep, setActiveStep] = useState(0)
    const handleChange = e => {
      setOrderId(e.target.value)
    }
    const orders = props.ordersStore.orders
    const findOrder = () => {
      let order = orders.find(o => o.shopifyId == orderId)
      if (order) {
        setActiveStep(order.progress)
        setOrderId("")
      } else {
        setOrderId("")
      }
      return order
    }

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
          Track
        </Button>
        <div className="activeStep">
          {activeStep > 0 ? <TrackingBar activeStep={activeStep} /> : null}
        </div>
      </div>
    )
  })
)

export default Tracker
