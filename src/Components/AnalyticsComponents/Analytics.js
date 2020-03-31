import React, {useState , useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import EmploeeTimeForTask from './EmploeeTimeForTask';
import OrdersPerProduct from './OrdersPerProduct';
import CompletedByEmployee from './CompletedByEmployee';

const Analytics = inject('ordersStore')(observer((props) => {


return(
    <div>
        <EmploeeTimeForTask/>
      <OrdersPerProduct/>
      <CompletedByEmployee/>
    </div>
)


}))
export default Analytics