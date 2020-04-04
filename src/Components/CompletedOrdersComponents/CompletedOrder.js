import React from "react";
import { inject, observer } from "mobx-react";
import {ExpansionPanel, ExpansionPanelDetails,
        ExpansionPanelSummary} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'


const CompletedOrder = inject("generalStore")(observer(props => {

    const customer = props.generalStore.customers.find(
        c => c.shopifyId === props.order.customerId
    );

    return (
    <div className={'completed-order-panel'}>
      <ExpansionPanel expanded={props.expanded === props.order._id}
        onChange={props.handleChange(props.order._id)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
            <div className={'orders-panel-header'}>
                <p>ID: {props.order.shopifyId}</p>
                <p>Product: {props.order.product.name}</p>
                <p>Name: {customer.name}</p>
                <p>Email: {customer.email}</p>
            </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <div className="panel-details">
                <div className="order-info">
                    <p>Tracking: {props.order.trackingNumber}</p>
                    <p>Order Date: {props.order.date.toDateString()}</p>
                    <p>Shipping Date: {props.order.endDate.toDateString()}</p>
                </div>
                <div className="order-workflow">
                    {Object.keys(props.order.stageEmployees).map((s,i) => 
                        <p key={i}>{s} : {props.order.stageEmployees[s].name}</p>    
                    )}
                </div>
             </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
    );
  })
);

export default CompletedOrder;