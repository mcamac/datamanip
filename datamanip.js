// These are not meant to be super fast - we can improve as necessary.
"use strict";

exports.__esModule = true;
exports.mapKeys = mapKeys;
exports.extendMapKeys = extendMapKeys;
exports.irange = irange;
exports.objFromItemFn = objFromItemFn;
exports.objFromValFn = objFromValFn;

function mapKeys(keyMap, arr) {
  return arr.map(function (pt) {
    var mapped = {};
    _.forEach(keyMap, function (val, key) {
      if (check.string(val)) {
        mapped[key] = pt[val];
      } else if (check.fn(val)) {
        mapped[key] = val(pt);
      }
    });
    return mapped;
  });
}

function extendMapKeys(keyMap, arr) {
  return R.zipWith(R.merge, arr, mapKeys(keyMap, arr));
}

function irange(m, n) {
  return R.range(m, Math.floor(n + 1));
}

function objFromItemFn(fn, keys) {
  return R.fromPairs(keys.map(fn));
}

function objFromValFn(fn, keys) {
  return objFromItemFn(function (k) {
    return [k, fn(k)];
  }, keys);
}

