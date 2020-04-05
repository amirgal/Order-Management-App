import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GeneralStore from './stores/GeneralStore'
import Helpers from './stores/Helpers'
import { Provider } from 'mobx-react';
import DetailsWindowStore from './stores/DetailsWindowStore'

const detailsWindowStore = new DetailsWindowStore()
const generalStore = new GeneralStore()
const helpers = new Helpers()
const store = {generalStore, detailsWindowStore, helpers}

ReactDOM.render(<Provider {...store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
