import React, {useState} from 'react';

const CompletedOrder = (props) => {
    
    return (
        <div id="order-row">
            <div className="order-row-item">{props.order.attributes}</div>
        </div>
    )
}

export default CompletedOrder