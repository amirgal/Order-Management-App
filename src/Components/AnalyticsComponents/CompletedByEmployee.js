import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import CompletedByChart from "./CompletedByChart";

const CompletedByEmployee = inject("generalStore")(
  observer(props => {
    const [perEmployee, setPerEmployee] = useState([]);
    
    useEffect(() => {
      if (perEmployee.length > 0) {
        const tempPerEmployee = props.generalStore.getCompletedByEmployee();
        setPerEmployee(tempPerEmployee);
      }}, [props.generalStore.boards,props.generalStore.completedOrders]);
    
    return (
      <div>
        {perEmployee.length> 0 ? (
          <CompletedByChart data ={perEmployee}/>
        ) : (
          <div>No completed Tasks yet</div>
        )}
      </div>
    );
  })
);
export default CompletedByEmployee;
