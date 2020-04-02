import React from "react"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"

const steps = [
  "Your board is being pressed",
  "Your board is on the CNC",
  "Your board is being sanded",
  "Your board is getting lacquered",
  "Your board is being packaged",
  "Your board will ship shortly",
  "Your board has been shipped"
]

const TrackingBar = props => {
  return (
    <div>
      <h3>{props.customer.name}</h3>
      <h4>{props.customer.email}</h4>
      <h4>Order no: {props.order.shopifyId}</h4>
      <Stepper activeStep={props.activeStep - 1} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}
export default TrackingBar
