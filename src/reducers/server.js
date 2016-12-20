import {SETSERVER} from '../constants/actiontypes';

const server = (state = 'http://localhost', action) => {
  switch(action.type) {
    case SETSERVER:
      return action.server;
    default:
      return state;
  }
};

export default server;
