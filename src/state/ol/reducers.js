import {GET_OL_MAP, SET_OL_MAP} from '../actiontypes';

const defaultState = {
  olMap: undefined
}

const olMap = (state = defaultState, action) => {
  switch(action.type) {
    case GET_OL_MAP:
      return state.olMap;
    case SET_OL_MAP:
      return Object.assign({}, state, {
        olMap: action.map
      });
    default:
      return state;
  }
};
export default olMap;
