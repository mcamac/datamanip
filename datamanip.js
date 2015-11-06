// These are not meant to be super fast - we can improve as necessary.
'use strict';

exports.__esModule = true;
var R = require('ramda');

// {k: String || (v -> v')} -> [{k: v}]-> [{k: v}]
var mapKeys = R.curry(function (keyMap, arr) {
  return arr.map(function (pt) {
    var mapped = {};
    R.mapObjIndexed(keyMap, function (val, key) {
      if (typeof val === 'string') {
        mapped[key] = pt[val];
      } else {
        mapped[key] = val(pt);
      }
    });
    return mapped;
  });
});

exports.mapKeys = mapKeys;
// {k: String || (v -> v')} -> [{k: v}]-> [{k: v}]
var extendMapKeys = R.curry(function (keyMap, arr) {
  return R.zipWith(R.merge, arr, mapKeys(keyMap, arr));
});

exports.extendMapKeys = extendMapKeys;
// Number -> Number -> [int]
var irange = R.curry(function (m, n) {
  return R.range(m, Math.floor(n + 1));
});

exports.irange = irange;
// (a -> [k, v]) -> [a] -> {k: v}
var objFromItemFn = R.curry(function (fn, keys) {
  return R.fromPairs(keys.map(fn));
});

exports.objFromItemFn = objFromItemFn;
// (k -> v) -> [k] -> {k: v}
var objFromValFn = R.curry(function (fn, keys) {
  return objFromItemFn(function (k) {
    return [k, fn(k)];
  }, keys);
});
exports.objFromValFn = objFromValFn;

