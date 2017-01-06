import {GET_SERVER, SET_SERVER} from '../actiontypes';

export function getServer() {
  return {
    type: GET_SERVER
  }
}
export function setServer(server) {
  return {
    type: SET_SERVER,
    server: server
  }
}
