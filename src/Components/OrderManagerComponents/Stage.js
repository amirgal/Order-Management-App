import React from 'react';
import { inject, observer } from 'mobx-react';
import OrderCard from './OrderCard';
import {List, ListItem} from '@material-ui/core'

const Stage = inject('generalStore')(observer((props) => {
   
    const filteredOrders = props.generalStore.orders
        .filter(o => o.progress === props.stage)
        .sort((a,b) => a.date - b.date)
        
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