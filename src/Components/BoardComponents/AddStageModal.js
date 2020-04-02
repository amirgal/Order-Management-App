import React, { useState, useEffect } from "react"
import { inject, observer } from "mobx-react"
import { makeStyles } from "@material-ui/core/styles"
import { Modal, Backdrop, Fade } from "@material-ui/core"
import NewStage from "./NewStage"

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

const AddStageModal = observer(props => {
  const classes = useStyles()
//   const [stageName, setStageName] = useState("")
//   const [notes, setNotes] = useState([])
//   const [validations, setValidations] = useState([])
  const [showModal, setShowModal] = useState(props.showModal)
  const addNewStage = newStage => {
    props.addNewStage(newStage)
  }

  const toggleModal = () => {
    props.toggleModal()
    setShowModal(props.showModal)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showModal}
        onClose={toggleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={true}>
          <div id="addStageModal">
            <NewStage toggleModal = {toggleModal}
              addNewStage={addNewStage}
            //   stageName={stageName}
            //   notes={notes}
            //   validations={validations}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  )
})

export default AddStageModal
