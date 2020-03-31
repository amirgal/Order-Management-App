import React, {useState} from 'react';

const CompletedOrder = (props) => {
    console.log(props.order)
    return (
        <div className="order-row">
            <div className="order-row-item">{props.order.shopifyId}</div>
            <div className="order-row-item">{props.order.product.name}</div>
            <div className="order-row-item">{props.order.price}</div>
            <div className="order-row-item"></div>
            <div className="order-row-item"></div>
            <div className="order-row-item">{props.order.date.toDateString()}</div>
            <div className="order-row-item">{props.order.endDate.toDateString()}</div>
        </div>
    )
}

export default CompletedOrder