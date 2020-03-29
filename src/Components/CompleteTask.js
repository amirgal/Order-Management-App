import React from 'react';
import { inject, observer } from 'mobx-react';
import {Button} from '@material-ui/core'
const CompleteTask = inject('ordersStore')(observer((props) => {
    
    return (
        <div id="complete-task">
            <Button>Complete</Button>
        </div>
    )
}))

export default CompleteTask