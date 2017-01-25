
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
export function isUserLoggedIn(state) {
  return state.map.userLoggedIn;
}
export function checkLogin(state) {
  return state.map.checkLogin;
}
