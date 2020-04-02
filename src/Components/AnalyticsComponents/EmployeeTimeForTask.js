import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import TaskTimeChart from "./TaskTimeChart";

const EmployeeTimeForTask = inject("generalStore")(
  observer(props => {
    const [averageTime, setAverageTime] = useState([]);
    
    useEffect(() => {
      if (props.generalStore.boards.length > 0 || props.generalStore.completedOrders.length > 0) {
        const avgTImeArr = props.generalStore.getAverageTimeForTask();
        setAverageTime(avgTImeArr);
      }}, [props.generalStore.boards,props.generalStore.completedOrders]);
    
    return (
      <div>
          
        {averageTime.length> 0 ? (
          <TaskTimeChart data ={averageTime}/>
        ) : (
          <div>No completed tasks yet</div>
        )}
      </div>
    );
  })
);
export default EmployeeTimeForTask;
