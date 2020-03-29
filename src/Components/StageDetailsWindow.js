import React, {useState} from 'react';
import { inject, observer } from 'mobx-react';

const StageDetailsWindow = inject('ordersStore')(observer((props) => {
    
    return (
        <div>details window</div>
    )
}))

export default StageDetailsWindow