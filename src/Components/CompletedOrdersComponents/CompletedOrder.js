import React from "react";
import { inject, observer } from "mobx-react";
import {ExpansionPanel, ExpansionPanelDetails,
        ExpansionPanelSummary} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


const CompletedOrder = inject("ordersStore")(observer(props => {

    const customer = props.ordersStore.customers.find(
        c => c.shopifyId === props.order.customerId
    );

    return (
    <div className={'completed-order-panel'}>
      <ExpansionPanel expanded={props.expanded === props.order._id}
        onChange={props.handleChange(props.order._id)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
            <div className={'panel-header'}>
                <div>ID: {props.order.shopifyId}</div>
                <div>Product: {props.order.product.name}</div>
                <div>Name: {customer.name}</div>
                <div>Email: {customer.email}</div>
            </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <div className="panel-details">
                <div>{props.order.price}</div>
                <div>{props.order.date.toDateString()}</div>
                <div>{props.order.endDate.toDateString()}</div>
             </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    );
  })
);

export default CompletedOrder;