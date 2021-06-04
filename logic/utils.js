const genArray = (length, value) => new Array(length).fill().map((_) => value) // genArray(5,3) => [3,3,3,3,3]
const removeDuplicates = (array) => [...new Set(array)]

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    )
  }, [])
}

function range(size, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt)
}

const removeLastItem = (arr) => {
  return arr.slice(0, -1)
}

module.exports = {
  genArray,
  removeDuplicates,
  flatten,
  range,
  removeLastItem,
}
