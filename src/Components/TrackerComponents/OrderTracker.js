import React from "react"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import { makeStyles } from "@material-ui/core/styles"


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: "primary"
  },
  stepper: {
    backgroundColor: "rgba(0,0,0,0)"
  }
}))

const steps = [
  "We are processing your order",
  "Order is in production",
  "Order is in final stages of production",
  "Order is being packaged",
  "Order has been shipped!"
]

const TrackingBar = props => {
  const classes = useStyles()
  const checkActiveStep = num => {
    const percent = num / (props.order.numStages)
    let activeStep =
      percent > 1
        ? 4
        : percent > 0.7 && percent <= 1
        ? 3
        : percent > 0.2 && percent < 0.7
        ? 2
        : 1
    if (props.order.isComplete) {
      
      activeStep = 5
    }
    return activeStep
  }
  const courier = (props.order.shippingAddress.courier == "Standard" ? "Israel Post" : "Fedex")
  return (
    <div className={classes.root}>
      <h5>Order Number: {props.order.shopifyId}</h5>
      <h3>{props.customer.name}</h3>
      <h4>{props.customer.email}</h4>
      {props.order.trackingNumber ? <h4>{courier} Tracking Number: {props.order.trackingNumber}</h4> : null}
      <Stepper
        className={classes.stepper}
        activeStep={(checkActiveStep(props.activeStep) -1)}
        alternativeLabel
      >
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
