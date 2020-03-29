import React, {useState} from 'react';
import { inject, observer } from 'mobx-react';

const OrderManager = inject('store')(observer((props) => {
    const [stages,setStages] = useState(7)

    return (
        <div id="stages-container"></div>
    )
}))

export default OrderManager