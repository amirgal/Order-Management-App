import React, {useState, useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import OrderCard from './OrderCard';
import {List, ListItem} from '@material-ui/core'

const Stage = inject('ordersStore')(observer((props) => {
    const [orders , setOrders] = useState([])

    useEffect(() => {
        loadStage(props.stage)
    },[props.ordersStore.orders])

    const loadStage = stage => {
        const stageOrders = props.ordersStore.orders.filter(o => o.progress == stage)
        setOrders(stageOrders)
    }

    return (
        <div className='stage'>
            <List>
            {orders.map((o,i) => 
                <ListItem>
                    <OrderCard key={i} order={o}/>
                </ListItem>
            )}
            </List>
        </div>
    )
}))

export default Stage