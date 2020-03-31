import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import ProductTimeChart from "./ProductTimeChart";

const CompletedTimePerProduct = inject("ordersStore")(
  observer(props => {
    const [timePerProduct, setTimePerProduct] = useState([]);
    
    useEffect(() => {
      if (props.ordersStore.orders.length > 0) {
        const tempTimePerProduct = props.ordersStore.getTimePerProduct();        
        setTimePerProduct(tempTimePerProduct);
      }}, [props.ordersStore.orders]);
    
    return (
      <div>
        {timePerProduct.length> 0 ? (
          <ProductTimeChart data ={timePerProduct}/>
        ) : (
            <div>No completed Orders yet</div>
        )}
      </div>
    );
  })
);
export default CompletedTimePerProduct;
