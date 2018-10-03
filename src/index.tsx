import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore.js';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker.js';

const store = configureStore({});

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    ), document.getElementById('root'));
registerServiceWorker();
