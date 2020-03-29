import React, { Fragment } from 'react';
import './App.css';
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import OrderManager from './Components/OrderManager';
import MyAppBar from './Components/MyAppBar';

const App = observer((props) => {
    
    return (
        <Router>
            <Route path="/ordermanager" exact render={() => 
                <Fragment>
                    <MyAppBar headline={'Order Manager'}/>
                    <OrderManager />
                </Fragment>
            }/>
        </Router>
    )
})

export default App
