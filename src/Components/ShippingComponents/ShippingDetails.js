import React from 'react';

const ShippingDetails = (props) => {
    
    return (
        <div className="shipping-details">
            <div className="detail">{props.details.address}</div>
            <div className="detail">{props.details.city}</div>
            <div className="detail">{props.details.zip}</div>
            {props.details.province ? <div className="detail">{props.details.province}</div> : null}
            <div className="detail">{props.details.country}</div>
            <div className="detail">{props.details.name}</div>
            <div className="detail">{props.details.phone}</div>
        </div>
    )
}

export default ShippingDetails