import { combineReducers } from 'redux';

//just for passing compilation
const dummyReducer = (state = 0, action) => state;
const rootReducer = combineReducers({dummyReducer});

export default rootReducer;
