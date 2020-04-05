import React from 'react';

const ShippingDetails = (props) => {
    
    return (
        <div className="shipping-details">
            <p>courier:{props.details.courier}</p>
            <p>Total Order: {props.price} ₪</p>
            <p className="detail">{props.details.address}, {props.details.city}</p>
            <p className="detail">{props.details.province ? props.details.province : null}
             {props.details.country} {props.details.zip}</p>
            <p className="detail">{props.details.phone}</p>
        </div>
    )
}

export default ShippingDetails