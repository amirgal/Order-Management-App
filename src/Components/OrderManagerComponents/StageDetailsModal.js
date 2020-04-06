import React from "react"
import { inject, observer } from "mobx-react"
import { Modal, Backdrop, Fade } from "@material-ui/core"
import CompleteTask from "./CompleteTask"
import ClaimTask from "./ClaimTask"
import Box from "@material-ui/core/Box"

const StageDetailsModal = inject("detailsWindowStore")(
  observer((props) => {
    const currOrder = props.detailsWindowStore.detailsWindowOrder

    const toggleModal = () => {
      props.detailsWindowStore.toggleDetailsWindow()
    }

    return (
      <Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={props.detailsWindowStore.showDetailsWindow}
          onClose={toggleModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={props.detailsWindowStore.showDetailsWindow}>
            <Box bgcolor="primary.main" id="details-window">
              <div id="product-details">
                <h3>{currOrder.product.name}</h3>
                <h4>{currOrder.attributes}</h4>
              </div>
              {currOrder.inProcess ? <CompleteTask /> : <ClaimTask />}
            </Box>
          </Fade>
        </Modal>
      </Box>
    )
  })
)

export default StageDetailsModal
