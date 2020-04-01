import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import TaskTimeChart from "./TaskTimeChart";

const EmployeeTimeForTask = inject("generalStore")(
  observer(props => {
    const [averageTime, setAverageTime] = useState([]);
    
    useEffect(() => {
      if (averageTime.length > 0) {
        const avgTImeArr = props.generalStore.getAverageTimeForTask();
        setAverageTime(avgTImeArr);
      }}, [averageTime]);
    
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
export default EmployeeTimeForTask;
