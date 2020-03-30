import React from 'react';
import { inject, observer } from 'mobx-react';
import CompleteTask from './CompleteTask';
import ClaimTask from './ClaimTask'

const StageDetailsWindow = inject('detailsWindowStore')(observer((props) => {
    const currOrder = props.detailsWindowStore.detailsWindowOrder
    const currStage = currOrder.progress
    return (
        <div id="details-window">
            <h3>{currOrder.product.stages[currStage].title}</h3>
            <div id="product-details">
                <p>Product Name: {currOrder.product.name}</p>
                <p>Attributes: {currOrder.attributes}</p>
            </div>
            {currOrder.inProcess ?
            <CompleteTask /> : <ClaimTask />} 
        </div>
    )
}))

export default StageDetailsWindow