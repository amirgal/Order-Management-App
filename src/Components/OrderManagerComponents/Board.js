import "../../styles/OrderManager.css"
import React from "react"
import { observer } from "mobx-react"
import Stage from "./Stage"

const Board = observer((props) => {
  const boardOrders = props.board.orders

  return (
    <div className="board" style={{gridTemplateColumns:`repeat(${props.board.stagesNum}, 1fr)`}}>
      {/* style={{gridTemplateColumns:`repeat(${props.board.stagesNum}, 1fr)`}} */}

      {props.board.stages.map((s, i) => (
        <Stage
          key={i}
          stage={s}
          orders={boardOrders.filter((o) => o.progress === i + 1)}
        />
      ))}
    </div>
  )
})

export default Board
