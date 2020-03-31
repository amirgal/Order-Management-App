import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import CompletedByChart from "./CompletedByChart";

const CompletedByEmployee = inject("ordersStore")(
  observer(props => {
    const [perEmployee, setPerEmployee] = useState([]);
    
    useEffect(() => {
      if (props.ordersStore.orders.length > 0) {
        const tempPerEmployee = props.ordersStore.getCompletedByEmployee();
        setPerEmployee(tempPerEmployee);
      }}, [props.ordersStore.orders]);
    
    return (
      <div>
        {perEmployee.length> 0 ? (
          <CompletedByChart data ={perEmployee}/>
        ) : (
          null
        )}
      </div>
    );
  })
);
export default CompletedByEmployee;
