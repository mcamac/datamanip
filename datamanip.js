// These are not meant to be super fast - we can improve as necessary.
"use strict";

exports.__esModule = true;
var mapKeys = R.curry(function (keyMap, arr) {
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
});

exports.mapKeys = mapKeys;
var extendMapKeys = R.curry(function (keyMap, arr) {
  return R.zipWith(R.merge, arr, mapKeys(keyMap, arr));
});

exports.extendMapKeys = extendMapKeys;
var irange = R.curry(function (m, n) {
  return R.range(m, Math.floor(n + 1));
});

exports.irange = irange;
var objFromItemFn = R.curry(function (fn, keys) {
  return R.fromPairs(keys.map(fn));
});

exports.objFromItemFn = objFromItemFn;
var objFromValFn = R.curry(function (fn, keys) {
  return objFromItemFn(function (k) {
    return [k, fn(k)];
  }, keys);
});
exports.objFromValFn = objFromValFn;

