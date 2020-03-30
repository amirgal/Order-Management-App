import React, {useState, useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import OrderCard from './OrderCard';
import {List, ListItem} from '@material-ui/core'

const Stage = inject('ordersStore')(observer((props) => {
   
    const filteredOrders = props.ordersStore.orders.filter(o => o.progress === props.stage)
    return (
        <div className='stage'>
            <List>
            {filteredOrders.map((o,i) => 
                <ListItem>
                    <OrderCard key={i} order={o}/>
                </ListItem>
            )}
            </List>
        </div>
    )
}))

export default Stage