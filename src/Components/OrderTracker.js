import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

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
  const classes = useStyles()
  return (
    <div>
      {/* <h3>{props.customer.name}</h3>
      <h4>{props.customer.email}</h4>
      <h4>Order no: {props.order.shopifyId}</h4> */}
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
