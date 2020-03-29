import React from 'react';
import { inject, observer } from 'mobx-react';
import CompleteTask from './CompleteTask';
import ClaimTask from './ClaimTask'

const StageDetailsWindow = inject('ordersStore','detailsWindowStore')(observer((props) => {
    
    return (
        <div id="details-window">
            <p>Task Name</p>
            {props.detailsWindowStore.detailsWindowOrder.inProcess ?
            <CompleteTask /> : <ClaimTask />} 
        </div>
    )
}))

export default StageDetailsWindow