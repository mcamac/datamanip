// These are not meant to be super fast - we can improve as necessary.
export function mapKeys(keyMap, arr) {
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
}

export function extendMapKeys(keyMap, arr) {
  return R.zipWith(R.merge, arr, mapKeys(keyMap, arr))
}

export function irange(m, n) {
  return R.range(m, Math.floor(n + 1))
}

export function objFromItemFn(fn, keys) {
  return R.fromPairs(keys.map(fn))
}

export function objFromValFn(fn, keys) {
  return objFromItemFn(k => [k, fn(k)], keys)
}
