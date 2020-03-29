import React, {useState} from 'react';
import { inject, observer } from 'mobx-react';

const CompleteTask = inject('ordersStore')(observer((props) => {
    
    return (
        <div></div>
    )
}))

export default CompleteTask