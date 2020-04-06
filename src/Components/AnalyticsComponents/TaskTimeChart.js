import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell,
  } from 'recharts';
import React from 'react';
import { inject, observer } from "mobx-react";
import { scaleOrdinal } from 'd3-scale';
import { schemeDark2 } from 'd3-scale-chromatic';

const colors = scaleOrdinal(schemeDark2).range();
// const colors = [,'#C6C013','#EF8A17','#034732','#E4572E','#F9C80E' , '#3FD6BC','#008148']
const TriangleBar = (props) => {
  const {
    fill, x, y, width, height,
  } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};  

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;
    
  
  
const TaskTimeChart = inject("generalStore")(
  observer(props => {
  
  return (
    <div>
      <h6>Average time per Task</h6>
    <BarChart
      width={325}
      height={155}
      data={props.data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis dataKey="average"  />
      <Tooltip/>
      <Bar type="monotone" shape={<TriangleBar/>} dataKey="average"  barSize={15} >
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
export default TaskTimeChart
  
  