import {GET_OL_MAP, SET_OL_MAP} from '../actiontypes';

export function getOlMap() {
  return {
    type: GET_OL_MAP
  }
}
export function setOlMap(map) {
  return {
    type: SET_OL_MAP,
    map: map
  }
}
