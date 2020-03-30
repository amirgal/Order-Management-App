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

const OrderCard = inject(
  "ordersStore",
  "detailsWindowStore"
)(
  observer(props => {
    const openDetailsWindow = () => {
      props.detailsWindowStore.toggleDetailsWindow()
      props.detailsWindowStore.setDetailsWindowOrder(props.order)
      console.log(props.ordersStore.orders[0].product)
    }

    return (
      <ExpansionPanel
        className={props.order.inProcess ? "order inProcess" : "order"}
        data-id="order"
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>
            <h3>{props.order.product.name}</h3>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            <ListItem>{props.order.attributes}</ListItem>
            {props.order.inProcess ? (
              <Fragment>
                <ListItem>
                  <p>
                    Employee: {props.order.stageEmployees[props.order.progress]}
                  </p>
                </ListItem>
                <ListItem>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={openDetailsWindow}
                  >
                    Complete Task
                  </Button>
                </ListItem>
              </Fragment>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={openDetailsWindow}
              >
                Claim Task
              </Button>
            )}
          </List>
          {console.log(props.order)}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  })
)

export default OrderCard
