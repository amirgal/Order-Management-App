import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import React from 'react';
import { inject, observer } from "mobx-react";

  
  
  
const CompletedByChart = inject("generalStore")(
  observer(props => { 

  return (
    <div>
    <p>Tasks Completed By Employee</p>
    <BarChart 
    width={350} 
    height={200} 
    data={props.data} 
    layout="vertical"
    margin={{top: 5, right: 30, left: 20, bottom: 5}}
    stackOffset="wiggle"
  >
    <CartesianGrid stroke="#808000" strokeDasharray="5 5"/>
    <YAxis type="category" dataKey="name" />
    <XAxis type="number" dataKey="amount"  />
  <Tooltip />
    <Legend />
    <Bar type="monotone"  dataKey="amount" fill="#776274" barSize={30}/>
  </BarChart>
  </div>
  );
}))
export default CompletedByChart

