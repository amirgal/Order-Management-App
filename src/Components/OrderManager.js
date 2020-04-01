import React from 'react';
import { inject, observer } from 'mobx-react';
import Stage from './Stage';
import StageDetailsWindow from './StageDetailsWindow';
import StageDetailsModal from './StageDetailsModal'

const OrderManager = inject('generalStore','detailsWindowStore')(observer((props) => {
    const stages = [1,2,3,4,5,6]

    // useEffect(() => {
    //     props.generalStore.initializeAll() 
        
    // },[]) 
  
    return (
        <div id="order-manager-page">
            <div id="stages-container">
                {stages.map(s => <Stage key={s} stage={s}/>)}
            </div>
            {props.detailsWindowStore.showDetailsWindow ? <StageDetailsModal /> : null}
        </div>
    )
}))

export default OrderManager