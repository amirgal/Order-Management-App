import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, AreaChart, Area,
  } from 'recharts';
import React from 'react';
import { inject, observer } from "mobx-react";
import { scaleOrdinal } from 'd3-scale';
import { schemeDark2 } from 'd3-scale-chromatic';

const colors = scaleOrdinal(schemeDark2).range();
// const colors = ['#E4572E','#F9C80E','#3FD6BC','#008148','#C6C013','#EF8A17','#034732']
  
  
  
const ProductTimeChart = inject("generalStore")(
  observer(props => {
  
  return (
    <div>
      <h5>Average work time per product</h5>
    <AreaChart
      width={325}
      height={155}
      data={props.data}
      margin={{
        top: 0, right: 30, left: 0, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="name"/>
      <YAxis dataKey="average"  />
      <Tooltip />
      <Area isAnimationActive={true} barSize={15} type="monotone" dataKey="average" fill={colors[5]}  >
      {
            props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))
          }
        </Area>
    </AreaChart>
    </div>
  );
}))
export default ProductTimeChart
  
  