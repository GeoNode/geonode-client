import MapConfigTransformService from 'boundless-sdk/services/MapConfigTransformService';
import MapConfigService from 'boundless-sdk/services/MapConfigService';
import {saveToGeonode} from '../services/geonode';

import * as types from '../constants/actiontypes';

export function resetMap() {
  return {
    type: types.RESET_MAP
  }
}
export function saveMapSuccess(body) {
  return {
    type: types.SAVE_MAP_SUCCESS,
    body
  }
}
export function saveMapError(error) {
  return {
    type: types.SAVE_MAP_ERROR,
    error
  }
}
export function setAbout(about) {
  return {
    type: types.SETABOUT,
    about
  }
}
export const setMapConfig = (map) => {
  const config = MapConfigTransformService.write(MapConfigService.save(map));
  return {
    type: types.SETMAP,
    config
  }
}

export const setServer = (server) => {
  return {
    type: types.SETSERVER,
    server
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
