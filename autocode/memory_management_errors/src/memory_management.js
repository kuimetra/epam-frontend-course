function cache(func) {
  const cacheObj = {};
  return function(...arr) {
    if (!(arr in cacheObj)) {
      cacheObj[arr] = func(...arr);
    }
    return cacheObj[arr];
  };
}

function tryCatchParseJSON(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

window.onerror = function windowParseJSON(json) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};

module.exports = {
  cache,
  tryCatchParseJSON,
  windowParseJSON,
};
