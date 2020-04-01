import React from 'react';
import { observer } from 'mobx-react';
import Stage from './OrderManagerComponents/Stage';

const Board = observer((props) => {
    
    // const getStageOrders = stage => props.board.getStageOrders(stage)
    const boardOrders = props.board.orders
    

    return (
        <div className="board">
            <div id="stages-container" style={{gridTemplateColumns:`repeat(${props.board.stages.length}, 1fr)`}}>
                {props.board.stages.map((s,i) => <Stage key={i} stage={s} orders={boardOrders.filter(o => o.progress === i+1)}/>)}
            </div>
        </div>
    )
})

export default Board