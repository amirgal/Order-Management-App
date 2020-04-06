import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
  } from 'recharts';
import React from 'react';
import { inject, observer } from "mobx-react";
import { scaleOrdinal } from 'd3-scale';
import { schemeDark2 } from 'd3-scale-chromatic';

// const colors = scaleOrdinal(schemeDark2).range();
const colors = ['#ED1C24','#EAC435','#FE4E00','#F86624','#FFAE03','#EF8A17','#034732']
  
const CompletedByChart = inject("generalStore")(
  observer(props => { 

  return (
    <div>
      <h5>Number of tasks competed per Employee</h5>
    <BarChart 
    width={325} 
    height={135} 
    data={props.data} 
    layout="vertical"
    margin={{top: 5, right: 30, left: 20, bottom: 5}}
    stackOffset="wiggle"
  >
    <CartesianGrid  strokeDasharray="5 5"/>
    <YAxis type="category" dataKey="name" />
    <XAxis type="number" dataKey="amount"  />
  <Tooltip />
    <Bar isAnimationActive={true} type="monotone"   dataKey="amount" fill="#776274" barSize={15}>
    {
            props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))
          }
      </Bar>
  </BarChart>
  </div>
  );
}))
export default CompletedByChart

