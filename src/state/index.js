import {combineReducers} from 'redux';
import mapConfig from './mapConfig/reducers';
import server from './server/reducers';
import map from './map/reducers';

const rootReducer = combineReducers({
  mapConfig,
  server,
  map
});

export default rootReducer;

