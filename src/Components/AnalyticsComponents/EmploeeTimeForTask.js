import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import TaskTimeChart from "./TaskTimeChart";

const EmploeeTimeForTask = inject("ordersStore")(
  observer(props => {
    const [averageTime, setAverageTime] = useState([]);
    
    useEffect(() => {
      if (props.ordersStore.orders.length > 0) {
        const avgTImeArr = props.ordersStore.getAverageTimeForTask();
        setAverageTime(avgTImeArr);
      }}, [props.ordersStore.orders]);
    
    return (
      <div>
          
        {averageTime.length> 0 ? (
          <TaskTimeChart data ={averageTime}/>
        ) : (
          null
        )}
      </div>
    );
  })
);
export default EmploeeTimeForTask;
