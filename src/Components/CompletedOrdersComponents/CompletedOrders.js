import '../../styles/CompletedOrders.css'
import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import CompletedOrder from "./CompletedOrder";
import SearchBar from "./SearchBar";

const CompletedOrders = inject("generalStore")(observer(props => {
    const [expanded, setExpanded] = useState(false);
    const [completedOrders,setCompletedOrders] = useState(props.generalStore.orders.
        filter(o => o.isComplete)).sort((a, b) => b.endDate - a.endDate)
    const [relevantOrders, setRelevantOrders] = useState(completedOrders)

    useEffect(()=>{
        setCompletedOrders(props.generalStore.orders
            .filter(o => o.isComplete).sort((a, b) => b.endDate - a.endDate))
        setRelevantOrders(props.generalStore.orders
            .filter(o => o.isComplete).sort((a, b) => b.endDate - a.endDate))
    },[props.generalStore.orders])
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const handleSearch = (input, searchParam) => {
        if(searchParam === 'shopifyId'){
            const relOrders = completedOrders
            .filter(o => o[searchParam].toString().includes(input))
            setRelevantOrders(relOrders)
        } else if(searchParam === 'product'){
            const relOrders = completedOrders
            .filter(o => o[searchParam].name.toLowerCase().includes(input))
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
