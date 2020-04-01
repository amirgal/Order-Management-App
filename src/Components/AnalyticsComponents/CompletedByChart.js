import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import React, { Component } from 'react';
import { inject, observer } from "mobx-react";

  
  
  
const CompletedByChart = inject("generalStore")(
  observer(props => { 

  return (
    <div>
    <p>Tasks Completed By Employee</p>
    <BarChart 
    width={600} 
    height={300} 
    data={props.data} 
    layout="vertical"
    margin={{top: 5, right: 30, left: 20, bottom: 5}}
  >
    <YAxis type="category" dataKey="name" fill="#884d8"/>
    <XAxis type="number" dataKey="amount"/>
    <CartesianGrid />
    <Tooltip/>
    <Legend />
    <Bar dataKey="amount" fill="#884d8" />
  </BarChart>
  </div>
  );
}))
export default CompletedByChart

