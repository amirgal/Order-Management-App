import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import PerProductChart from "./PerProductChart";

const OrdersPerProduct = inject("generalStore")(
  observer(props => {
    const [perProduct, setPerProduct] = useState([]);
    
    useEffect(() => {
        if(props.generalStore.orders.length > 0 ){
          const tempPerProduct = props.generalStore.getOrdersPerProduct();
          setPerProduct(tempPerProduct);
        }
      }, [props.generalStore]);
    
    return (
      <div>
        {perProduct.length> 0 ? (
          <PerProductChart data ={perProduct}/>
        ) : (
          null
        )}
      </div>
    );
  })
);
export default OrdersPerProduct;
