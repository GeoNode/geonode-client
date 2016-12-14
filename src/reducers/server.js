import {
  SETSERVER
} from './actions'

const server = (state = 'http://localhost', action) => {
  switch(action.type) {
    case 'SETSERVER':
      return action.server;
    default:
      return state;
  }
  return state;
}

export default server;
