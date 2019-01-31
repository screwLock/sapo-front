import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore.js';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker.js';
import 'normalize.css/normalize.css';
import "@blueprintjs/core/lib/css/blueprint.css";
import Amplify from 'aws-amplify'
import config from "./config"

const store = configureStore({});

Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      // identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
/*
    Storage: {
      region: config.s3.REGION,
      bucket: config.s3.BUCKET,
      identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
*/
    API: {
      endpoints: [
        {
          name: "users",
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION
        },
        {
          name: "pickups",
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION
        }
      ]
    }
  });

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    ), document.getElementById('root'));
registerServiceWorker();
