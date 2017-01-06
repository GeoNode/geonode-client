import {GET_SERVER, SET_SERVER} from '../actiontypes';

const defaultState = {
  server: undefined
}

const server = (state = defaultState, action) => {
  switch(action.type) {
    case GET_SERVER:
      return state.server;
    case SET_SERVER:
      return Object.assign({}, state, {
        server: action.server
      });
    default:
      return state;
  }
};
export default server;
