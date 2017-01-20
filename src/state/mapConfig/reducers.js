import {SET_MAP_CONFIG, SET_ABOUT} from '../actiontypes';

let initialConfig = {
  defaultSourceType: '',
  about: {},
  map: {},
  sources: {}
};
const mapConfig = (state = initialConfig, action) => {
  switch(action.type) {
    case SET_ABOUT:
      return Object.assign({}, state, {
        about: action.about
      });
    case SET_MAP_CONFIG:
      return Object.assign({}, state, action.config);
    default:
      return state;
  }
}

export default mapConfig;
