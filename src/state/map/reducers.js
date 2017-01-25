import {GET_MAP_ID, SET_MAP_ID, GET_IS_EDITING, SAVE_MAP_SUCCESS, SAVE_MAP_ERROR, SET_USER_LOGGED_IN, SET_CHECK_LOGIN} from '../actiontypes';

const defaultState = {
  id: undefined,
  userLoggedIn: false,
  checkLogin: false,
  save: {
    success: false,
    error: false,
    errorMessage: undefined
  }
};

const map = (state = defaultState, action) => {
  switch(action.type) {
    case GET_MAP_ID:
      return state.id;
    case SET_MAP_ID:
      return Object.assign({}, state, {
        id: action.mapId
      });
    case GET_IS_EDITING:
      return (state.id !== undefined);
    case SAVE_MAP_SUCCESS:
      return Object.assign({}, state, {
        save: {success: true, error: false},
        id: action.result.id
      });
    case SAVE_MAP_ERROR:
      return Object.assign({}, state, {
        save: {success: false, error: true, errorMessage: action.error}
      });
    case SET_USER_LOGGED_IN:
      return Object.assign({}, state, {
        userLoggedIn: action.loggedIn
      });
    case SET_CHECK_LOGIN:
      return Object.assign({}, state, {
        checkLogin: action.check
      });
    default:
      return state;
  }
}
export default map;
