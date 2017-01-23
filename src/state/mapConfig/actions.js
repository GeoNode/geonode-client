import * as types from '../actiontypes';

export function setMapConfig(config) {
  return {
    type: types.SET_MAP_CONFIG,
    config
  };
}
export function setAbout(about) {
  return {
    type: types.SET_ABOUT,
    about
  };
}
