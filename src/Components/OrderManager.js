import React, {useState} from 'react';
import { inject, observer } from 'mobx-react';

const OrderManager = inject('store')(observer((props) => {
    const [stages,setStages] = useState(7)

    const loadStage = stage => {
        
        return 
    }

    return (
        <div id="stages-container">
            {for(let i = 1 ; i <= stages; i++){
                
            }}
        </div>
    )
}))

export default OrderManager