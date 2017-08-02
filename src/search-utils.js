
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
 * @param {*} The value to initialise the key with if not found.
 */
export function updateLocalStorageArray(key, val, fallback) {
  const ls = checkLocalStorage();
  if (ls) {
    try {
      let searches = ls.getItem(key) || fallback || '[]';
      searches = JSON.parse(searches);
      searches.push(q);
      searches = JSON.stringify(searches)
      ls.setItem(key, searches);
    } catch(e) {
      console.log("Exception in adding query to ls", e);
    }
  }
}
