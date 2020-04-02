import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import ProductTimeChart from "./ProductTimeChart";

const CompletedTimePerProduct = inject("generalStore")(
  observer(props => {
    const [timePerProduct, setTimePerProduct] = useState([]);
    
    useEffect(() => {
      if (timePerProduct.length > 0) {
        const tempTimePerProduct = props.generalStore.getTimePerProduct();        
        setTimePerProduct(tempTimePerProduct);
      }}, [props.generalStore.completedOrders]);
    
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
