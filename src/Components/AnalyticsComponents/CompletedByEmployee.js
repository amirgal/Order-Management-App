import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import CompletedByChart from "./CompletedByChart";

const CompletedByEmployee = inject("generalStore")(
  observer(props => {
    const [perEmployee, setPerEmployee] = useState([]);
    
    useEffect(() => {
      if (props.generalStore.orders.length > 0) {
        const tempPerEmployee = props.generalStore.getCompletedByEmployee(); 
        setPerEmployee(tempPerEmployee);
      }}, [props.generalStore.orders]);
    
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
