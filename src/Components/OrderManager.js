import React, {useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import Stage from './Stage';
import StageDetailsWindow from './StageDetailsWindow';

const OrderManager = inject('ordersStore','detailsWindowStore')(observer((props) => {
    const stages = [1,2,3,4,5,6]
    
    

    useEffect(() => {
        props.ordersStore.initializeAll() 
        
    },[]) 
  
    return (
        <div id="order-manager-page">
            <div id="stages-container">
                {stages.map(s => <Stage key={s} stage={s}/>)}
            </div>
            {props.detailsWindowStore.showDetailsWindow ? <StageDetailsWindow /> : null}
        </div>
    )
}))

export default OrderManager