import React, {useState, useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import Stage from './Stage';

const OrderManager = inject('ordersStore')(observer((props) => {
    const [stages,setStages] = useState([])
    const [numStages,setNumStages] = useState(7)
    
    useEffect(() => {
        const arr = []
        for(let i = 1 ; i <= numStages ; i++){
            arr.push(<Stage stage={i}/>)
        }
        setStages(arr)
    },[])

    return (
        <div id="order-manager-page">
            <div id="stages-container">
                {stages}
            </div>
            {props.ordersStore.showDetailsWindow ? <StageDetailsWindow /> : null}
        </div>
    )
}))

export default OrderManager