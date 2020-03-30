import React, { Fragment, useEffect } from 'react';
import './App.css';
import { observer , inject } from 'mobx-react'
import { BrowserRouter as Router, Route, useHistory} from 'react-router-dom';
import OrderManager from './Components/OrderManager';
import MyAppBar from './Components/MyAppBar';
import Settings  from './Components/Settings';

const App = inject('ordersStore')(observer((props) => {
    // const history = useHistory()
     useEffect(() => {
        props.ordersStore.initializeAll() 
        
    },[])
    
    return (
        <Router>
            {/* <Route path="/" exact render={() => history.push('/order-manager')}/> */}
            <Route path="/order-manager" exact render={() => 
                <Fragment>
                    <MyAppBar headline={'Order Manager'}/>
                    <OrderManager />
                </Fragment>
            }/>
            <Route path="/settings" exact render={() => 
                <Fragment>
                    <MyAppBar headline={'Settings'}/>
                    <Settings />
                </Fragment>
            }/>
        </Router>
    )
}))

export default App
