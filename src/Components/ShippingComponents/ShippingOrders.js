import '../../styles/ShippingOrders.css'
import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import ShippingOrder from "./ShippingOrder";
import ShipOrdersModal from "./ShipOrdersModal"

const ShippingOrders = inject("generalStore")(observer(props => {
    
    const [expanded, setExpanded] = useState(false);
    // const shippingOrdersByID = props.generalStore.rdyToShipOrdersById
    const [shippingOrdersByID, setShippingOrdersById] = useState(props.generalStore.rdyToShipOrdersById)
    const [showModal, setShowModal] = useState(false)
    const [modalOrders, setModalOrders] = useState([])
    
    const openModalWithOrders = (orders) => {
        setModalOrders(orders)
        setShowModal(true)
    }
    useEffect(() => {
        setShippingOrdersById({...props.generalStore.rdyToShipOrdersById})
    },[props.generalStore.rdyToShipOrdersById])
    
    const shipItems = (trackingNumber) => {
        modalOrders.forEach(o => {
            o.completeOrder(trackingNumber)
        });
        const newShippingById = {...shippingOrdersByID}
        newShippingById[modalOrders[0].shopifyId] = null
        setShippingOrdersById(newShippingById)
    }
    
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
        <div id="completed-orders-page">
            <div id="completed-orders-table">
                {Object.keys(shippingOrdersByID).map((id,i) =>
                    shippingOrdersByID[id] ? 
                    <ShippingOrder openModalWithOrders={openModalWithOrders} handleChange={handleChange}
                     expanded={expanded} key={i} orders={shippingOrdersByID[id]}/>
                    : null
                )}
            </div>
            <ShipOrdersModal shipItems={shipItems}
            showModal={showModal} setShowModal={setShowModal}/>
        </div>
    );
}));

export default ShippingOrders;
