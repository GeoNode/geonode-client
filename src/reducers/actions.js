import MapConfigTransformService from 'boundless-sdk/services/MapConfigTransformService';
import MapConfigService from 'boundless-sdk/services/MapConfigService';
import {getCRSFToken, removeTrailingSlash} from '../helper'

import 'whatwg-fetch'

import * as types from '../constants/actiontypes'

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
export const saveMap = (map) => {
  return (dispatch, getState) => {
    let state = getState();
    var myInit = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCRSFToken()
      },
      body: JSON.stringify(state.mapConfig)
    };
    return fetch(removeTrailingSlash(state.server) + '/maps/new/data',myInit)
    .then((response) => response.json())
    .then((json) => dispatch(saveMapSuccess(json)))
    .catch(ex => dispatch(saveMapError(ex)));
  }
}
