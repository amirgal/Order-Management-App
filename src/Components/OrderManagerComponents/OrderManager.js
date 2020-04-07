import React from "react"
import { inject, observer } from "mobx-react"
import StageDetailsModal from "./StageDetailsModal"

const OrderManager = inject(
  "generalStore",
  "detailsWindowStore"
)(
  observer((props) => {
    return (
      <div>
        {props.detailsWindowStore.showDetailsWindow ? (
          <StageDetailsModal />
        ) : null}
      </div>
    )
  })
)
export default OrderManager
