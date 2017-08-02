import lsc from 'lscache';

const recentSearchLimit = 7;

export function checkLocalStorage() {
  if (window && window.localStorage) {
    return window.localStorage
  }
  return false;
}

/**
 * 
 * @param {*} key The key to search in localStorage
 * @param {*} val The val to append to the key
 * @param {*} The value to initialise array with if not found.
 */
export function updateLocalStorageArray(key, val, fallback) {
  const ls = checkLocalStorage();
  if (ls) {
    let searches = lsc.get(key) || fallback || [];
    searches.unshift(val);
    searches.length > recentSearchLimit ? searches.pop() : null;
    lsc.set(key, searches);
  }
}

export function getLocalStorageArray(key, fallback) {
  const ls = checkLocalStorage();
  if (ls) {
    let data = lsc.get(key) || fallback || [];
    console.log("returnnrjnrjnrjrn", data);
    return data;
  }
}