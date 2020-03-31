import '../../styles/CompletedOrders.css'
import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import CompletedOrder from "./CompletedOrder";
import SearchBar from "./SearchBar";

const CompletedOrders = inject("ordersStore")(observer(props => {
    
    const relevantOrders = props.ordersStore.orders.filter(o => o.isComplete)
    const handleSearch = (input) => {

    }

    return (
        <div id="completed-orders-page">
            <SearchBar handleSearch={handleSearch}/>
            <div id="completed-orders-table">
                {relevantOrders.map((o,i) => <CompletedOrder key={i} order={o}/>)}
            </div>
        </div>
    );
}));

export default CompletedOrders;
