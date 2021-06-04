const { getKey } = require('./keys')
const { genArray } = require('./utils')

const getWordsPositions = (key, lines, totalWords) => {
  // mutable
  let data = []

  lines.reduce((currentLine, nextLine, index) => {
    const prevLine = lines[index - 2]
    const prevLineKey = getKey(prevLine)
    const currentLineKey = getKey(currentLine)
    const nextLineKey = getKey(nextLine)

    const currentLineNumber = index - 1

    const [, , currentWordIndex] = currentLine

    // Ayat detected in this line, but it starts from previous line
    if (
      currentLineKey === key &&
      prevLineKey !== key &&
      currentWordIndex !== 0
    ) {
      const prevLineNumber = currentLineNumber - 1
      data = [...data, ...genArray(currentWordIndex, prevLineNumber)]
    }

    // Ayat detected in this line and continue till the end of the line
    if (currentLineKey === key && nextLineKey === key) {
      const [, , nextWordIndex] = nextLine
      const numOfWords = nextWordIndex - currentWordIndex
      data = [...data, ...genArray(numOfWords, currentLineNumber)]
    }

    // Ayat detected in this line, and stopped in this same line
    if (currentLineKey === key && nextLineKey !== key) {
      const numOfWords = totalWords - currentWordIndex
      data = [...data, ...genArray(numOfWords, currentLineNumber)]
    }

    return nextLine
  })

  return data
}

module.exports = {
  getWordsPositions,
}
