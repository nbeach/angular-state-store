import {findIndex} from "lodash"

export function replace<T>(matcher: (value: T) => boolean, array: T[], value: T) {
  const targetIndex = findIndex(array, matcher)
  const before = array.slice(0, targetIndex)
  const after = array.slice(targetIndex + 1)

  return [...before, value, ...after]
}

