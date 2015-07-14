// These are not meant to be super fast - we can improve as necessary.
export var mapKeys = R.curry(function (keyMap, arr) {
  return arr.map(pt => {
    var mapped = {}
    _.forEach(keyMap, (val, key) => {
      if (check.string(val)) {
        mapped[key] = pt[val]
      } else if (check.fn(val)) {
        mapped[key] = val(pt)
      }
    })
    return mapped
  })
})

export var extendMapKeys = R.curry(function (keyMap, arr) {
  return R.zipWith(R.merge, arr, mapKeys(keyMap, arr))
})

export var irange = R.curry(function (m, n) {
  return R.range(m, Math.floor(n + 1))
})

export var objFromItemFn = R.curry(function (fn, keys) {
  return R.fromPairs(keys.map(fn))
})

export var objFromValFn = R.curry(function (fn, keys) {
  return objFromItemFn(k => [k, fn(k)], keys)
})
