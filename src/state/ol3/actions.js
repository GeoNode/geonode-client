import {GET_OL3_MAP, SET_OL3_MAP} from '../actiontypes';

export function getOl3Map() {
  return {
    type: GET_OL3_MAP
  }
}
export function setOl3Map(map) {
  return {
    type: SET_OL3_MAP,
    map: map
  }
}
