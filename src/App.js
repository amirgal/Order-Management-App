import React, { Fragment } from 'react';
import './App.css';
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import OrderManager from './Components/OrderManager';
import MyAppBar from './Components/MyAppBar';
import Settings  from './Components/Settings';

const App = observer((props) => {
    
    return (
        <Router>
            <Route path="/ordermanager" exact render={() => 
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
})

export default App
