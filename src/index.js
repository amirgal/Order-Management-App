import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import OrdersStore from './stores/OrdersStore'
import { Provider } from 'mobx-react';
import DetailsWindowStore from './stores/DetailsWindowStore'

const detailsWindowStore = new DetailsWindowStore()
const ordersStore = new OrdersStore()
const store = {ordersStore, detailsWindowStore}

ReactDOM.render(<Provider {...store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
