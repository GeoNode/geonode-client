import MapConfigTransformService from 'boundless-sdk/services/MapConfigTransformService';
import MapConfigService from 'boundless-sdk/services/MapConfigService';
import {getCRSFToken, removeTrailingSlash} from '../helper';
const NEW_MAP_ENDPOINT = '/maps/new/data';

import 'whatwg-fetch';

const createRequestObject = function(method, body) {
  return {
    method: method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCRSFToken()
    },
    body: body
  };
};
const saveEndPoint = (id = undefined) => {
  return id ? `/maps/${id}/data` : NEW_MAP_ENDPOINT;
};
const saveMethod = (id = undefined) => {
  return id ? 'PUT' : 'POST';
};
const checkStatus = (response) => {
  if(response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};
export const saveToGeonode = (server,config, id = undefined) => {
  var request = createRequestObject(saveMethod(id), JSON.stringify(config));
  var requestPath = removeTrailingSlash(server) + saveEndPoint(id);
  return fetch(requestPath,request)
    .then(checkStatus)
    .then((response) => response.json())
    .catch((ex) => Promise.reject(ex));
};
export const getMapConfigFromMap = (map) => {
  return MapConfigTransformService.write(MapConfigService.save(map));
};

export const login = (server, username, password) => {
  const requestPath = removeTrailingSlash(server) + '/account/ajax_login'
  const request = createRequestObject('POST', JSON.stringify({username: username, password: password}));
  return fetch(requestPath, request).then(checkStatus).then((response) => response.json())
}
