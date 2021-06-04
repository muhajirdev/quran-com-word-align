const { genArray } = require('./utils')
const totalAyahSurah = require('../data/total-ayah-surah.json')

const normalLine = (line) => line.length === 3

const getWordsPositions = (key, lines, totalWords) => {
  const lineNumber = lines.findIndex((currentLine, index) => {
    const nextLine = lines[index + 1]

    const [targetSurah, targetAyah] = key.split(':')

    // handle corner case: if there's a short ayah at the end of surah, but not the end of page
    if (nextLine.length === 1 && targetAyah <= totalAyahSurah[targetSurah])
      return true

    if (!nextLine || !normalLine(nextLine)) return false
    if (!currentLine || !normalLine(currentLine)) return false

    const [nextLineSurah, nextLineAyah] = lines[index + 1]
    const [currentLineSurah, currentLineAyah] = currentLine

    // ayah in between lines
    const result = targetAyah > currentLineAyah && targetAyah < nextLineAyah

    return result
  })

  if (lineNumber === -1) return []

  return genArray(totalWords, lineNumber)
}

module.exports = {
  getWordsPositions,
}
