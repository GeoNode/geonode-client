import {getServerUrl} from '../server/selectors'
import {removeTrailingSlash} from '../../helper';
import {VIEW_MAP_ENDPOINT} from '../../constants/server';

function isError(state) {
  return (state.map.save.error && !state.map.save.success) ? true : false;
}
export function isSaving(state) {
  return state.map.save.success ? false : true;
}
export function success(state) {
  return state.map.save.success;
}
export function error(state) {
  return isError(state);
}
export function errorMessage(state) {
  return isError(state) ? state.map.save.errorMessage : undefined;
}
export function getMapId(state) {
  return state.map.id;
}
export function getMapViewUrl(state) {
  return `${removeTrailingSlash(getServerUrl(state))}${VIEW_MAP_ENDPOINT}${getMapId(state)}`;
}
