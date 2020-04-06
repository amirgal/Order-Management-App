import React, { useState } from "react"
import { observer } from "mobx-react"
import { makeStyles } from "@material-ui/core/styles"
import { Modal, Backdrop, Fade, Button, TextField, Box} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

const ShipOrdersModal = observer(props => {
  const classes = useStyles()
  const [trackingNumber, setTrackingNumber] = useState("")

  const setShowModal = () => {
    props.setShowModal(false)
  }

  const shipItems = () => {
    props.shipItems(trackingNumber)
    props.setShowModal(false)
  }

  return (
    
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.showModal}
      onClose={setShowModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.showModal}>
        <Box bgcolor='background.paper' id="shipping-modal">
          <TextField vartian="outlined" label="Tracking Number" value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)} color="secondary"/>
          <Button variant="contained" onClick={shipItems} color="secondary"
          disabled={trackingNumber.length === 0}>Ship Items</Button>
        </Box>
      </Fade>
    </Modal>
  )
})

export default ShipOrdersModal