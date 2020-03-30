import React, { useState, useEffect } from "react"
import { inject, observer } from "mobx-react"
import { Button, TextField } from "@material-ui/core"

const Tracker = inject("ordersStore")(
  observer(props => {
    const [orderId, setOrderId] = useState("")
    const handleChange = e => {
      setOrderId(e.target.value)
    }

    useEffect(() => {
      props.ordersStore.getOrders()
    }, [])
    const findOrder = () => {
        console.log(props.orders)
    }

    return (
      <div className="tracker_page">
        <TextField
          id="outlined-basic"
          label="Order Number"
          variant="outlined"
          value={orderId}
          onChange={handleChange}
        />
        <Button onClick={findOrder}variant="contained">Track</Button>
      </div>
    )
  })
)

export default Tracker
