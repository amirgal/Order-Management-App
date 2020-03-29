import React from 'react';
import { inject, observer } from 'mobx-react';
import {Button} from '@material-ui/core'
const CompleteTask = inject('ordersStore','detailsWindowStore')(observer((props) => {
    
    const completeStage = () => {
        props.detailsWindowStore.detailsWindowOrder.advanceStage()
        props.detailsWindowStore.toggleDetailsWindow()
    }

    return (
        <div id="complete-task">
            <Button variant='contained' color='primary'
            onClick={completeStage}>Complete</Button>
        </div>
    )
}))

export default CompleteTask