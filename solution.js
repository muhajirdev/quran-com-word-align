const {
  getWordsPositions: getExplicitAyahWordsPosition,
} = require('./logic/explicit-ayah')
const {
  getWordsPositions: getImplicitAyahWordsPosition,
} = require('./logic/implicit-ayah')

const { getAllKeys, findKey } = require('./logic/keys')
const totalWords = require('./data/total-words.json')

const solution = (pages) => {
  const result = pages.map((lines, index) => {
    const pageNumber = index + 1

    const allKeys = getAllKeys(lines)

    return allKeys.reduce((data, key) => {
      const keyCanBeFound = findKey(lines, key)
      const words = keyCanBeFound
        ? getExplicitAyahWordsPosition(key, lines, totalWords[key])
        : getImplicitAyahWordsPosition(key, lines, totalWords[key])

      return {
        ...data,
        [key]: {
          page: pageNumber,
          words: words,
        },
      }
    }, {})
  })

  return result
}

module.exports = solution
