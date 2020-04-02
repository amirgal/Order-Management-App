import '../../styles/CompletedOrders.css'
import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import ShippingOrder from "./ShippingOrder";
// import SearchBar from "./SearchBar";

const ShippingOrders = inject("generalStore")(observer(props => {
    const [expanded, setExpanded] = useState(false);
    const rdyForShipping = props.generalStore.orders.filter(o => o.isReadyToShip)
    const [relevantOrders, setRelevantOrders] = useState(rdyForShipping)

    // useEffect(()=>{
    //     setRelevantOrders(props.generalStore.completedOrders)
    // },[props.generalStore.completedOrders])
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const handleSearch = (input, searchParam) => {
        if(searchParam === 'shopifyId'){
            const relOrders = rdyForShipping
            .filter(o => o[searchParam].toString().includes(input))
            setRelevantOrders(relOrders)
        } else if(searchParam === 'product'){
            const relOrders = rdyForShipping
            .filter(o => o[searchParam].name.toLowerCase().includes(input))
            setRelevantOrders(relOrders)
        }
    }
    
    return (
        <div id="completed-orders-page">
            {/* <SearchBar handleSearch={handleSearch}/> */}
            <div id="completed-orders-table">
                {relevantOrders.map((o,i) =>
                    <ShippingOrder handleChange={handleChange}
                     expanded={expanded} key={i} order={o}/>
                )}
            </div>
        </div>
    );
}));

export default ShippingOrders;
