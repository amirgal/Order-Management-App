import React from "react"
import { inject, observer } from "mobx-react"
import OrderCard from "./OrderCard"
import { List, ListItem } from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Stage = inject("generalStore")(
  observer((props) => {
    const filteredOrders = props.orders.sort((a, b) => a.date - b.date)

    return (
      <div className="stage">
        <Card square className='stageTitle'>
            <h4>{props.stage.name}</h4>
        </Card>

        <List>
          {filteredOrders.map((o, i) => (
            <ListItem key={i}>
              <OrderCard stage={props.stage} order={o} />
            </ListItem>
          ))}
        </List>
      </div>
    )
  })
)

export default Stage
