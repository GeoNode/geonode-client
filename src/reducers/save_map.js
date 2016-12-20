import {SAVE_MAP_SUCCESS, SAVE_MAP_ERROR, RESET_MAP} from '../constants/actiontypes';

const defaultState = {
  body: undefined,
  success: false,
  error: false
};

const saveMap = (state = defaultState, action) => {
  switch(action.type) {
    case SAVE_MAP_SUCCESS:
      return Object.assign({}, state, {
        success: true,
        body: action.body
      });
    case SAVE_MAP_ERROR:
      return Object.assign({}, state, {
        success: false,
        error: action.error
      });
    case RESET_MAP:
      return Object.assign({}, state, defaultState);
    default:
      return state;
  }
};

export default saveMap;
