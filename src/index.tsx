import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import configureStore from './configureStore';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore({});

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    ), document.getElementById('root'));
registerServiceWorker();
