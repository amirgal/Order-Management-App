import React, {useState , useEffect} from 'react';
import '../../styles/Analytics.css'

import { inject, observer } from 'mobx-react';
import EmployeeTimeForTask from './EmployeeTimeForTask';
import OrdersPerProduct from './OrdersPerProduct';
import CompletedByEmployee from './CompletedByEmployee';
import CompletedTimePerProduct from './CompletedTimePerProduct';

const Analytics = inject('ordersStore')(observer((props) => {


return(
    <div className="analytics">
        <EmployeeTimeForTask/>
      <OrdersPerProduct/>
      <CompletedByEmployee/>
      <CompletedTimePerProduct/>
    </div>
)


}))
export default Analytics