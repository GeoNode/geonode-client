import MapConfigTransformService from 'boundless-sdk/services/MapConfigTransformService';
import MapConfigService from 'boundless-sdk/services/MapConfigService';
import {getCRSFToken} from '../helper'

export const SETMAP = 'SETMAP';
export const SETABOUT = 'SETABOUT';
export const SETSERVER = 'SETSERVER';

const saveMapToGeonode = (server, config) => {
  return dispatch => {
		var myInit = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCRSFToken()
      },
      body: JSON.stringify(config)
    };
    fetch('/maps/new/data',myInit).then((response) => response.json() );
  }
}
export const setAbout = (about) => {
  return {
    type: SETABOUT,
    about
  }
}
export const setMapConfig = (map) => {
  const config = MapConfigTransformService.write(MapConfigService.save(map));
  return {
    type: SETMAP,
    config
  }
}

export const setServer = (server) => {
  return {
    type: SETSERVER,
    server
  }
}
export const saveMap = (map) => {
  return (dispatch, getState) => {
    let state = getState();
    return dispatch(saveMapToGeonode(state.server, state.mapConfig));
  }
}
