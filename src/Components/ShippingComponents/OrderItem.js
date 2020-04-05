import React from 'react';
import {Paper} from '@material-ui/core'
const OrderItem = (props) => {
    
    return (
        <div className={`order-item ${props.order.isReadyToShip ? 'ready' : null}`}>
            {/* <Paper className={`order-item ${props.order.isReadyToShip ? 'ready' : null}`}> */}
                <div className="statusLight"></div>
                <h3>{props.order.product.name}</h3>
            {/* </Paper> */}
        </div>
    )
}

export default OrderItem