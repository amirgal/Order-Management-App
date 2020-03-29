import React from 'react';
import './App.css';
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import OrderManager from './Components/OrderManager';

const App = observer((props) => {
    
    return (
        <Router>
            <Route path="/ordermanager" exact render={() => 
                <OrderManager />
            }/>
        </Router>
    )
})

export default App
