import React, {useState} from 'react';

const Header = () => {
    
    return (
        <div id="order-rows-header" className="order-row">
            <div className="header-row-item">ORDER ID</div>
            <div className="header-row-item">PRODUCT</div>
            <div className="header-row-item">PRICE</div>
            <div className="header-row-item">EMAIL</div>
            <div className="header-row-item">NAME</div>
            <div className="header-row-item">RECIEVED AT</div>
            <div className="header-row-item">SHIPPED AT</div>
        </div>
    )
}

export default Header