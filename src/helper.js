export const getCRSFToken = () => {
  let csrfToken, csrfMatch = document.cookie.match(/csrftoken=(\w+)/);
  if (csrfMatch && csrfMatch.length > 0) {
    csrfToken = csrfMatch[1];
  }
  return csrfToken;
};
export const hasTrailingSlash = (str) => {
  return (/.*\/$/).test(str);
};
export const removeTrailingSlash = (str) => {
  return hasTrailingSlash(str) ? str.slice(0, -1) : str;
};
