const { genArray } = require('./utils')

const normalLine = (line) => line.length === 3

const getWordsPositions = (key, lines, totalWords) => {
  const lineNumber = lines.findIndex((currentLine, index) => {
    const nextLine = lines[index + 1]

    if (!nextLine || !normalLine(nextLine)) return false
    if (!currentLine || !normalLine(currentLine)) return false

    const [nextSurah, nextLineAyah] = lines[index + 1]
    const [currentSurah, currentLineAyah] = currentLine
    const [targetSurah, targetAyah] = key.split(':')

    const result = targetAyah > currentLineAyah && targetAyah < nextLineAyah

    return result
  })

  if (lineNumber === -1) return []

  return genArray(totalWords, lineNumber)
}

module.exports = {
  getWordsPositions,
}
