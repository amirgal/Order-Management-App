import React, { useState } from "react"
import { inject, observer } from "mobx-react"
import { Button, TextField, Box } from "@material-ui/core"
import { useParams } from "react-router"
import TrackingBar from "./OrderTracker"

const Tracker = inject("generalStore")(
  observer((props) => {
    const { id } = useParams()
    const [orderId, setOrderId] = useState(id ? id : "")
    const [activeStep, setActiveStep] = useState(0)
    const [orderObj, setOrderObj] = useState(null)
    const [customer, setCustomer] = useState(null)

    const handleChange = (e) => {
      setOrderId(e.target.value)
    }
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        findOrder()
      }
    }
    const findOrder = async () => {
      const order = await props.generalStore.getSingleOrder(orderId)
      
      if (order) {
        const customer = await props.generalStore.getSingleCustomer(
          order.customerId
        )
        setCustomer(customer)
        setOrderObj(order)
        setActiveStep(order.progress)
        setOrderId("")
      } else {
        setOrderId("")
        alert("Invalid Order Number")
      }
    }

    return (
      <Box className="tracker_page" bgcolor="background.paper" square="true">
        <TextField
          color="secondary"
          className="trackInput"
          id="outlined-basic"
          label="Order Number"
          variant="outlined"
          value={orderId}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button id="trackButton" color='secondary'onClick={findOrder} variant="contained">
          Track Order
        </Button>
        <div className="activeStep">
          {activeStep > 0 ? (
            <TrackingBar
              activeStep={activeStep}
              order={orderObj}
              customer={customer}
              // trackingNum={trackingNum}
            />
          ) : null}
        </div>
      </Box>
    )
  })
)

export default Tracker
