import {combineReducers, createStore} from "redux";

import * as reducers from './reducer';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

export {store, reducer};