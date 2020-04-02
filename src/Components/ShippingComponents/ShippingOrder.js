import React from "react";
import { inject, observer } from "mobx-react";
import {ExpansionPanel, ExpansionPanelDetails,
        ExpansionPanelSummary, Paper} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ShippingDetails from "./ShippingDetails";
import OrderItem from "./OrderItem";


const ShippingOrder = inject("generalStore")(observer(props => {

    const customer = props.generalStore.customers.find(
        c => c.shopifyId === props.orders[0].customerId
    );

    return (
    <div className={'completed-order-panel'}>
      <ExpansionPanel expanded={props.expanded === props.orders[0]._id}
        onChange={props.handleChange(props.orders[0]._id)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
            <div className={'panel-header'}>
                <p>ID: {props.orders[0].shopifyId}</p>
                {/* <p>Product: {props.orders[0].product.name}</p> */}
                <p>Name: {customer.name}</p>
                <p>Email: {customer.email}</p>
            </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <div className="panel-details">
                <div className="order-info">
                    <p>Total Price: {props.orders[0].price}</p>
                    <p>Order Date: {props.orders[0].date.toDateString()}</p>
                </div>
                <div className="all-order-items">
                    {props.orders.map((o,i) => <OrderItem key={i} order={o}/>)}
                </div>
                <ShippingDetails details={props.orders[0].shippingAddress}/>
             </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    );
  })
);

export default ShippingOrder;