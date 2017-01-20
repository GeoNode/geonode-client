import {GET_SERVER_URL, SET_SERVER_URL} from '../actiontypes';

const defaultState = {
  url: undefined
}

const server = (state = defaultState, action) => {
  switch(action.type) {
    case GET_SERVER_URL:
      return state.url;
    case SET_SERVER_URL:
      return Object.assign({}, state, {
        url: action.url
      });
    default:
      return state;
  }
};
export default server;
