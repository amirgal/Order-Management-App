import React from "react"
import { Fragment } from "react"
import { inject, observer } from "mobx-react"
import {
  List,
  ListItem,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  ExpansionPanel,
  Button
} from "@material-ui/core"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const OrderCard = inject('detailsWindowStore')(observer((props) => {
    
    const openDetailsWindow = () => {
      props.detailsWindowStore.toggleDetailsWindow()
      props.detailsWindowStore.setDetailsWindowOrder(props.order)
    }

    return (
      <ExpansionPanel
        className={
          props.order.inProcess
            ? "order inProcess"
            : props.order.progress == 6
            ? "order ready"
            : "order"
        }
        data-id="order"
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="statusLight"></div>
            <h3>{props.order.product.name}</h3>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            <ListItem ><p className="attributes">{props.order.attributes}</p></ListItem>
            {props.order.inProcess ? (
              <Fragment>
                <ListItem>
                  <p id="employeeName">
                    Employee: {props.order.stageEmployees[props.order.progress]}
                  </p>
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    onClick={openDetailsWindow}
                  >
                    Complete Stage
                  </Button>
                </ListItem>
              </Fragment>
            ) : (
              <Button
                variant="contained"
                onClick={openDetailsWindow}
              >
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
