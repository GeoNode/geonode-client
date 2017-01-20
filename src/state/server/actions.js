import {GET_SERVER_URL, SET_SERVER_URL} from '../actiontypes';

export function getServerUrl() {
  return {
    type: GET_SERVER_URL
  }
}
export function setServerUrl(url) {
  return {
    type: SET_SERVER_URL,
    url: url
  }
}
