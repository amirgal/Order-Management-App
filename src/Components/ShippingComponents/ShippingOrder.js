import React from "react";
import { inject, observer } from "mobx-react";
import {ExpansionPanel, ExpansionPanelDetails,
        ExpansionPanelSummary, Button} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ShippingDetails from "./ShippingDetails";
import OrderItem from "./OrderItem";


const ShippingOrder = inject("generalStore")(observer(props => {

    const customer = props.generalStore.customers.find(
        c => c.shopifyId === props.orders[0].customerId
    );
    const ordersReady = props.orders.every(o => o.isReadyToShip)
  //   const checkCompletion = () => {
  //     return props.orders.every(o => o.isReadyToShip)
  // }

  const openModalWithOrders = () => {
    props.openModalWithOrders(props.orders)
  }
   
    return (
    <div className={`shipping-order-panel ${ordersReady ? 'ready' : null}`}>
      <ExpansionPanel expanded={props.expanded === props.orders[0]._id}
        onChange={props.handleChange(props.orders[0]._id)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
            <div className={'shipping-panel-header'}>
                <p>{props.orders[0].date.toDateString()}</p>
                <p>ID: {props.orders[0].shopifyId}</p>
                <p>{customer.name}</p>
                <p>{customer.email}</p>
            </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <div className="shipping-panel-details">
                {/* <div className="shipping-order-info">
                    <p>{props.orders[0].price} ₪</p>
                    <p>{props.orders[0].date.toDateString()}</p>
                </div> */}
                <ShippingDetails price={props.orders[0].price} details={props.orders[0].shippingAddress}/> 
                <div className="all-order-items">
                    {props.orders.map((o,i) => <OrderItem key={i} order={o}/>)}
                </div>
                {/* <h4>Shipping Details</h4> */}
                <div className="buttons">
                  <Button variant="contained" target="_blank" rel="noopener noreferrer"
                    href="https://www.israelpost.co.il/content.nsf/pages/237">
                    Get Tracking Label
                  </Button>
                  <Button variant="contained" disabled={!ordersReady}
                  onClick={openModalWithOrders}>
                    Ship Items
                  </Button>
                </div>
            </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    );
  })
);

export default ShippingOrder;