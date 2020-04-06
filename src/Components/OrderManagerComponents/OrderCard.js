import React from "react"
import { inject, observer } from "mobx-react"
import {
  List,
  ListItem,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
  Button,
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const OrderCard = inject("detailsWindowStore")(
  observer((props) => {
    const openDetailsWindow = () => {
      props.detailsWindowStore.toggleDetailsWindow()
      props.detailsWindowStore.setDetailsWindowOrder(props.order)
      props.detailsWindowStore.setDetailsWindowStage(props.stage)
    }

    return (
      <ExpansionPanel
        square
        className={props.order.inProcess ? "order inProcess" : "order"}
      >
        <ExpansionPanelSummary
          square='true'
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <div className="order-card-header">
            {/* <div className="statusLight"></div>  */}
            <h4>{props.order.product.name}</h4>
            <h5>{props.order.attributes}</h5>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="order-card-details">
            <div>
              <h5> ID: {props.order.shopifyId}</h5>
              <h5>{props.order.date.toDateString()}</h5>
              {props.order.inProcess ? (
                <h5 id="employeeName">
                  Employee:{" "}
                  {props.order.stageEmployees[props.order.progress].name}
                </h5>
              ) : null}
            </div>
            <div className="cardButton">
              {props.order.inProcess ? (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={openDetailsWindow}
                >
                  Complete
                </Button>
              ) : (
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={openDetailsWindow}
                >
                  Start
                </Button>
              )}
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  })
)

export default OrderCard
