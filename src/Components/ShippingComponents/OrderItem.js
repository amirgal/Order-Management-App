import React from 'react';
const OrderItem = (props) => {
    
    return (
        <div className={`order-item ${props.order.isReadyToShip ? 'ready' : null}`}>
                <div className="statusLight"></div>
                <h3>{props.order.product.name}</h3>
        </div>
    )
}

export default OrderItem