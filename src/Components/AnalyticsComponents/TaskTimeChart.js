import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import React, { Component } from 'react';
import { inject, observer } from "mobx-react";

  
  
  
    const TaskTimeChart = inject("ordersStore")(
      observer(props => {
      
      return (
        <div>
          <p>Average Minutes per Task</p>
        <BarChart
          width={500}
          height={300}
          data={props.data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="name"/>
          <YAxis dataKey="average"  />
          <Tooltip />
          <Legend label="what"/>
          <Bar dataKey="average" fill="#884d8" />
          
        </BarChart>
        </div>
      );
    }))
    export default TaskTimeChart
  
  