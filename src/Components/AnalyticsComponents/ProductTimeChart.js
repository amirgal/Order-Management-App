import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import React, { Component } from 'react';
import { inject, observer } from "mobx-react";

  
  
  
const ProductTimeChart = inject("generalStore")(
  observer(props => {
  
  return (
    <div>
    <BarChart
      width={350}
      height={175}
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
      <Bar barSize={20} type="monotone" dataKey="average" fill="#EDD0C5" />
      
    </BarChart>
    </div>
  );
}))
export default ProductTimeChart
  
  