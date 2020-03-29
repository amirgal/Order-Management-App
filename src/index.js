import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import OrdersStore from './stores/OrdersStore'
import { Provider } from 'mobx-react';

const ordersStore = new OrdersStore()
const store = {ordersStore}
ReactDOM.render(<Provider {...store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
