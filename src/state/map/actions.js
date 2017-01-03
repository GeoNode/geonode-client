import * as types from '../actiontypes'
import {saveToGeonode} from '../../services/geonode';


export function getId() {
  return {
    type: types.GET_MAP_ID
  }
}
export function isEditing() {
  return {
    type: types.GET_IS_EDITING
  }
}
export function setMapId(id) {
  return {
    type: types.SET_MAP_ID,
    id: id
  }
}
export function getOl3Map() {
  return {
    type: types.GET_OL3_MAP
  }
}
export function setOl3Map(map) {
  return {
    type: types.SET_OL3_MAP,
    map: map
  }
}
export function saveMapError(error) {
  return {
    type: types.SAVE_MAP_ERROR,
    error
  }
}
export function saveMapSuccess(result) {
  return {
    type: types.SAVE_MAP_SUCCESS,
    result
  }
}
export const saveMap = () => {
  return (dispatch, getState) => {
    let state = getState();
    return saveToGeonode(state.server, state.mapConfig, state.id)
    .then((json) => dispatch(saveMapSuccess(json)))
    .catch(ex => dispatch(saveMapError(ex)));
  }
}
