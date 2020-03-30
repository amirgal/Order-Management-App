import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

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
  "You board is being packaged",
  "You board will ship shortly",
  "Your board has been shipped"
]
const TrackingBar = props => {
  const classes = useStyles()
  return (
    <div >
      <Stepper activeStep={props.activeStep -1} alternativeLabel>
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
