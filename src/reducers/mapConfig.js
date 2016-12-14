import {
  SETMAP, SETABOUT
} from './actions'

let initialConfig = {
  defaultSourceType: '',
  about: {},
  map: {},
  sources: {}
};
const mapConfig = (state = initialConfig, action) => {
  switch(action.type) {
    case 'SETABOUT':
      return Object.assign({}, state, {
        about: action.about
      });
    case 'SETMAP':
      return Object.assign({}, state, action.config );
    default:
      return state;
  }
  return state;
}

export default mapConfig;
