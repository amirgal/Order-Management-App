import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import PerProductChart from "./PerProductChart";

const OrdersPerProduct = inject("ordersStore")(
  observer(props => {
    const [perProduct, setPerProduct] = useState([]);
    
    useEffect(() => {
      if (props.ordersStore.orders.length > 0) {
        const tempPerProduct = props.ordersStore.getOrdersPerProduct();
        setPerProduct(tempPerProduct);
      }}, [props.ordersStore.orders]);
    
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
