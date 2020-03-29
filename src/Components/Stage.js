import React, {useState, useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import OrderCard from './OrderCard';

const Stage = inject('ordersStore')(observer((props) => {
    const [orders , setOrders] = useState([])

    useEffect(() => {
        loadStage(props.stage)
    },[])

    const loadStage = stage => {
        const stageOrders = props.ordersStore.orders.filter(o => o.progress == stage)
        setOrders(stageOrders)
    }

    return (
        <div className='stage'>
            {orders.map(o => <OrderCard />)}
        </div>
    )
}))

export default Stage