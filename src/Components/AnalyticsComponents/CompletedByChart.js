import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import React, { Component } from 'react';
import { inject, observer } from "mobx-react";

  
  
  
    const CompletedByChart = inject("ordersStore")(
      observer(props => { 
    
      return (
        <div>
        <div>Tasks Completed By Employee</div>
        <BarChart 
        width={600} 
        height={300} 
        data={props.data} 
        layout="vertical"
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
      >
        <YAxis type="category" dataKey="name" fill="#82ca9d"/>
        <XAxis type="number" dataKey="amount"/>
        <CartesianGrid />
        <Tooltip/>
        <Legend />
        <Bar dataKey="amount" fill="#82ca9d" />
      </BarChart>
      </div>
      );
    }))
    export default CompletedByChart
  
  