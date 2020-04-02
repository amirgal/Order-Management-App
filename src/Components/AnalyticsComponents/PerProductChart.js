import {
     Tooltip,PieChart, Pie, Legend,
  } from 'recharts';
  
import React from 'react';
import { inject, observer } from "mobx-react";

  
  
  
const PerProductChart = inject("generalStore")(
  observer(props => {
  
  

  return (
    <div>
    <PieChart width={350} height={175}>
    <Pie dataKey="number" isAnimationActive={true} data={props.data}  cx="50%" cy="50%" outerRadius={75} innerRadius={25} margin={{top: 0, right: 5, left: 20, bottom: 5,}} fill="#889E86" /> 
    <Tooltip />
    <Legend/>
    </PieChart>
    </div>
  );
}))
export default PerProductChart

