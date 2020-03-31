import {
     Tooltip,PieChart, Pie,
  } from 'recharts';
  
import React, { Component } from 'react';
import { inject, observer } from "mobx-react";

  
  
  
    const PerProductChart = inject("ordersStore")(
      observer(props => {
      
      
    
      return (
        <div>
            <div>Orders Per Product</div>
        <PieChart width={500} height={300}>
        <Pie dataKey="number" isAnimationActive={false} data={props.data} cx={200} cy={200} outerRadius={80} fill="#82ca9d" /> 
        <Tooltip />
        </PieChart>
        </div>
      );
    }))
    export default PerProductChart
  
  