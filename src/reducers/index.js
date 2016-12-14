import { combineReducers } from 'redux';
import mapConfig from './mapConfig';
import server from './server';

const rootReducer = combineReducers({
  mapConfig,
  server
})

export default rootReducer;

