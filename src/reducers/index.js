import fetchCoinsReducer from './fetchCoins';
import fetchNewsReducer from './fetchNews';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ fetchCoinsReducer, fetchNewsReducer });

export default rootReducer;
