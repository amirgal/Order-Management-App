import React, {useState} from 'react';
import { inject, observer } from 'mobx-react';
import Stage from './OrderManagerComponents/Stage';

const Board = observer((props) => {
    
    const getStageOrders = stage => {
        return props.board.getStageOrders(stage)
    }

    return (
        <div className="board">
            <div id="stages-container" style={{gridTemplateColumns:`repeat(${props.board.stages.length}, 1fr)`}}>
                {props.board.stages.map((s,i) => <Stage key={s} orders={() => getStageOrders(i+1)}/>)}
            </div>
        </div>
    )
})

export default Board