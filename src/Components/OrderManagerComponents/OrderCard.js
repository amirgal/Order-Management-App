import React from "react"
import { inject, observer } from "mobx-react"
import {
  List,
  ListItem,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel,
  Button
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const OrderCard = inject("detailsWindowStore")(
  observer(props => {
    const openDetailsWindow = () => {
      props.detailsWindowStore.toggleDetailsWindow()
      props.detailsWindowStore.setDetailsWindowOrder(props.order)
      props.detailsWindowStore.setDetailsWindowStage(props.stage)
    }
    
    return (
      <ExpansionPanel
        className={
          props.order.inProcess
            ? "order inProcess"
            : "order"
        }
        data-id="order"
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <div className="order-card-header">
            <div className="statusLight"></div> 
              <h3>{props.order.product.name}</h3>
              <h3>{props.order.attributes}</h3>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            <ListItem>
              <div className="order-card-details">
                <h3> {props.order.shopifyId}</h3>
                <h3>{props.order.date.toDateString()}</h3>
                {props.order.inProcess ? 
                 <h3 id="employeeName">
                 Employee: {props.order.stageEmployees[props.order.progress].name}
               </h3> : null}
              </div>
            </ListItem>
            {props.order.inProcess ? (
              <ListItem>
                <Button variant="contained" onClick={openDetailsWindow}>
                  Complete Stage
                </Button>
              </ListItem>
            ) : (
              <Button variant="contained" onClick={openDetailsWindow}>
                Start Stage
              </Button>
            )}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  })
)

export default OrderCard
