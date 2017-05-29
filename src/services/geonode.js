import MapConfigTransformService from 'boundless-sdk/services/MapConfigTransformService';
import MapConfigService from 'boundless-sdk/services/MapConfigService';
import {
  getCRSFToken,
  removeTrailingSlash
} from '../helper';
import {
  edit_map_endpoint,
  NEW_MAP_ENDPOINT
} from '../constants/server'

import 'whatwg-fetch';

const createRequestObject = function(method, body, contentType = 'application/json') {
  return {
    method: method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': contentType,
      'X-CSRFToken': getCRSFToken()
    },
    body: body
  };
};
const saveEndPoint = (id = undefined) => {
  return id ? edit_map_endpoint(id) : NEW_MAP_ENDPOINT;
};
const saveMethod = (id = undefined) => {
  return id ? 'PUT' : 'POST';
};
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};
export const saveToGeonode = (server, config, id = undefined) => {
  var request = createRequestObject(saveMethod(id), JSON.stringify(config));
  var requestPath = removeTrailingSlash(server) + saveEndPoint(id);
  return fetch(requestPath, request)
    .then(checkStatus)
    .then((response) => response.json())
    .catch((ex) => Promise.reject(ex));
};
export const getMapConfigFromMap = (map) => {
  return MapConfigTransformService.write(MapConfigService.save(map));
};

export const login = (server, username, password) => {
  const requestPath = removeTrailingSlash(server) + '/account/ajax_login'
  const request = createRequestObject('POST', encodeURI(`csrfmiddlewaretoken=${getCRSFToken()}&username=${username}&password=${password}`), 'application/x-www-form-urlencoded');
  return fetch(requestPath, request).then(checkStatus).then((response) => true)
}

export const getLocalGeoServer = (sources, baseUrl) => {
  for (var key in sources) {
    var source = sources[key];
    if (source.ptype === 'gxp_wmscsource' && source.url.indexOf(baseUrl) === 0 && source.url.indexOf('access_token') !== -1) {
      return source;
    }
  }
};
export const createThumbnail = (obj_id, map) => {
  map.once('postcompose', function(evt) {
    var canvas = evt.context.canvas;
    canvas.toBlob(function(blob) {
      var url = window.location.pathname.replace('/view', '');

      if (typeof obj_id != 'undefined' && url.indexOf('new')) {
        url = url.replace('new', obj_id);
      }
      url += '/thumbnail/react';
      var reader = new window.FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function() {
        fetch(url, {
          method: 'POST',
          credentials: "same-origin",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "X-CSRFToken": getCRSFToken()
          },
          body: JSON.stringify({
            image: reader.result
          })
        })
      }

    });
  });
  map.renderSync();
};
