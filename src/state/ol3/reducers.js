import {GET_OL3_MAP, SET_OL3_MAP} from '../actiontypes';

const defaultState = {
  ol3Map: undefined
}

const ol3Map = (state = defaultState, action) => {
  switch(action.type) {
    case GET_OL3_MAP:
      return state.ol3map;
    case SET_OL3_MAP:
      return Object.assign({}, state, {
        ol3Map: action.map
      });
    default:
      return state;
  }
};
export default ol3Map;
