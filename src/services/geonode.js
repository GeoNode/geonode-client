import {getCRSFToken, removeTrailingSlash} from '../helper';
const NEW_MAP_ENDPOINT = '/maps/new/data';
const EDIT_MAP_ENDPOINT = '/maps/1/data';

import 'whatwg-fetch'

const createRequestObject = function(body) {
    var myInit = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCRSFToken()
      },
      body: body
    };
}
const saveEndPoint = (id=undefined) => {
  return id ? `/maps/${id}/data`: NEW_MAP_ENDPOINT;
}
const checkStatus = (response) => {
  if(response.status >= 200 && response.status < 300) {
    //if response has id
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
export const saveToGeonode = (server,config, id = undefined) => {
  var request = createRequestObject(JSON.stringify(config));
  var requestPath = removeTrailingSlash(server)+saveEndPoint(id);
  return fetch(requestPath,request)
    .then(checkStatus)
    .then((response) => response.json())
    .catch((ex) => Promise.reject(ex));
}
