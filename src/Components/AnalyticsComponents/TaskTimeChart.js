import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import React from 'react';
import { inject, observer } from "mobx-react";

  
  
  
const TaskTimeChart = inject("generalStore")(
  observer(props => {
  
  return (
    <div>
    <BarChart
      width={350}
      height={175}
      data={props.data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey="name" />
      <YAxis dataKey="average"  />
      <Tooltip/>
      <Legend type/>
      <Bar type="monotone" dataKey="average" fill="#55828B" barSize={20} />
      
    </BarChart>
    </div>
  );
}))
export default TaskTimeChart
  
  