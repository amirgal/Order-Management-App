import '../../styles/CompletedOrders.css'
import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import CompletedOrder from "./CompletedOrder";
import SearchBar from "./SearchBar";

const CompletedOrders = inject("ordersStore")(observer(props => {
    const [expanded, setExpanded] = React.useState(false);
    const [relevantOrders, setRelevantOrders] = React.useState(props.ordersStore.completedOrders)
    // let relevantOrders = props.ordersStore.completedOrders
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const handleSearch = (input, searchParam) => {
        if(searchParam === 'shopifyId'){
            const relOrders = props.ordersStore.completedOrders.filter(o => o[searchParam].toString().includes(input))
            setRelevantOrders(relOrders)
        }
    }

    return (
        <div id="completed-orders-page">
            <SearchBar handleSearch={handleSearch}/>
            <div id="completed-orders-table">
                {relevantOrders.map((o,i) =>
                    <CompletedOrder handleChange={handleChange}
                     expanded={expanded} key={i} order={o}/>
                )}
            </div>
        </div>
    );
}));

export default CompletedOrders;
