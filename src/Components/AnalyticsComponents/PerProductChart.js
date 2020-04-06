import {
     Tooltip,PieChart, Pie, Legend, Cell, CartesianGrid,
  } from 'recharts';
  
import React from 'react';
import { inject, observer } from "mobx-react";
import { scaleOrdinal } from 'd3-scale';
import { schemeDark2 } from 'd3-scale-chromatic';

const colors = ['#EAC435','#ED1C24','#FE4E00','#F86624','#FFAE03','#EF8A17','#034732']
  
const PerProductChart = inject("generalStore")(
  observer(props => {
  
  

  return (
    <div>
      <h5>Number of orders per Product</h5>
    <PieChart width={325} height={155} margin={{top: 0, right: 5, left: 20, bottom: 5,}}>
    <Pie paddingAngle={10} dataKey="number" isAnimationActive={true} data={props.data}  cx="50%" cy="50%" outerRadius={75} innerRadius={55} margin={{top: 0, right: 5, left: 20, bottom: 5,}} fill="#889E86" >
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

