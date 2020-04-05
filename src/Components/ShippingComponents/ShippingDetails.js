import React from 'react';

const ShippingDetails = (props) => {
    
    return (
        <div className="shipping-details">
            <p className="detail">{props.details.address}</p>
            <p className="detail">{props.details.city}</p>
            <p className="detail">{props.details.zip}</p>
            {props.details.province ? <p className="detail">{props.details.province}</p> : null}
            <p className="detail">{props.details.country}</p>
            <p className="detail">{props.details.name}</p>
            <p className="detail">{props.details.phone}</p>
        </div>
    )
}

export default ShippingDetails