import '../../styles/ShippingOrders.css'
import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import ShippingOrder from "./ShippingOrder";

const ShippingOrders = inject("generalStore")(observer(props => {
    const [expanded, setExpanded] = useState(false);
    // const shippingOrdersByID = props.generalStore.rdyToShipOrdersById
    const [shippingOrdersByID, setShippingOrdersById] = useState(props.generalStore.rdyToShipOrdersById)

    const shipItems = orders => {
        orders.forEach(o => {
            o.completeOrder()
        });
        const newShippingById = {...shippingOrdersByID}
        newShippingById[orders[0].shopifyId] = null
        setShippingOrdersById(newShippingById)
    }
    console.log(shippingOrdersByID)
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
        <div id="completed-orders-page">
            <div id="completed-orders-table">
                {Object.keys(shippingOrdersByID).map((id,i) =>
                    shippingOrdersByID[id] ? 
                    <ShippingOrder shipItems={shipItems} handleChange={handleChange}
                     expanded={expanded} key={i} orders={shippingOrdersByID[id]}/>
                    : null
                )}
            </div>
        </div>
    );
}));

export default ShippingOrders;
