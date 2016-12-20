import {combineReducers} from 'redux';
import mapConfig from './mapConfig';
import server from './server';
import saveMap from './save_map';

const rootReducer = combineReducers({
  mapConfig,
  server,
  saveMap
});

export default rootReducer;

