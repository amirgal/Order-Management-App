import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import React, { Component } from 'react';
import { inject, observer } from "mobx-react";

  
  
  
    const ProductTimeChart = inject("ordersStore")(
      observer(props => {
      
      return (
        <div>
          <p>Average Hours per Product</p>
        <BarChart
          width={500}
          height={300}
          data={props.data}
          margin={{
            top: 5, right: 30, left: 0, bottom: 5,
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
    export default ProductTimeChart
  
  