import {
     Tooltip,PieChart, Pie,
  } from 'recharts';
  
import React, { Component } from 'react';
import { inject, observer } from "mobx-react";

  
  
  
    const PerProductChart = inject("ordersStore")(
      observer(props => {
      
      
    
      return (
        <div>
            <p>Orders Per Product</p>
        <PieChart width={500} height={400}>
        <Pie dataKey="number" isAnimationActive={false} data={props.data} cx={200} cy={200} outerRadius={90} margin={{top: 5, right: 30, left: 0, bottom: 5,}} fill="#884d8" /> 
        <Tooltip />
        </PieChart>
        </div>
      );
    }))
    export default PerProductChart
  
  