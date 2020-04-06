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
    <div className={`completed-order-panel`}>
      <ExpansionPanel expanded={props.expanded === props.order._id}
        onChange={props.handleChange(props.order._id)} square>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
        >
            <div className={'orders-panel-header'}>
                <p>ID: {props.order.shopifyId}</p>
                <p>{props.order.product.name}</p>
                <p>{customer.name}</p>
                <p>{customer.email}</p>
            </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <div className="panel-details">
                <div className="order-info">
                    <p>Order Date: {props.order.date.toDateString()}</p>
                    <p>Shipping Date: {props.order.endDate.toDateString()}</p>
                    <p>Tracking Number: {props.order.trackingNumber}</p>
                </div>
                <div className="order-workflow">
                    {Object.keys(props.order.stageEmployees).map((s,i) => 
                        <div className="workflow-item" key={i}>
                          <p>{props.order.stageEmployees[s].stageName}</p>
                          <p>{props.order.stageEmployees[s].name}</p>
                        </div>
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