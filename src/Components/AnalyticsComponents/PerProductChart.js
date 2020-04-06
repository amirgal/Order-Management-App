import {
     Tooltip,PieChart, Pie, Legend, Cell, CartesianGrid,
  } from 'recharts';
  
import React from 'react';
import { inject, observer } from "mobx-react";
import { scaleOrdinal } from 'd3-scale';
import { schemeDark2 } from 'd3-scale-chromatic';

const colors = scaleOrdinal(schemeDark2).range();
// const colors = ['#F9C80E' ,'#008148','#C6C013','#EF8A17','#034732','#E4572E', '#3FD6BC']
  
const PerProductChart = inject("generalStore")(
  observer(props => {
  
  

  return (
    <div>
      <h5>Number of orders per Product</h5>
    <PieChart width={325} height={155} margin={{top: 0, right: 5, left: 20, bottom: 5,}}>
    <Pie dataKey="number" isAnimationActive={true} data={props.data}  cx="50%" cy="50%" outerRadius={75} innerRadius={25} margin={{top: 0, right: 5, left: 20, bottom: 5,}} fill="#889E86" >
    {
            props.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))
          } 
      </Pie>
    <Tooltip />
    </PieChart>
    </div>
  );
}))
export default PerProductChart

