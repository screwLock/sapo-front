import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers/rootReducer.js';

export default function configureStore(preloadedState) {
    const store = createStore(rootReducer, preloadedState);
    return store;
  }

