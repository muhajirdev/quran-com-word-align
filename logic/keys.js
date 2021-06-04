const { range, flatten, removeLastItem } = require('./utils')

const getKey = (currentLine) => {
  if (!currentLine) return null
  if (currentLine.length < 3) return null

  const [surah, verse] = currentLine
  return `${surah}:${verse}`
}

const normalLine = (lineItems) => lineItems.length === 3

const generateKeys = (surah, lines) => {
  const ayahs = lines
    .filter(normalLine)
    .filter((line) => line[0] === surah)
    .map((line) => line[1])

  const minAyah = Math.min(...ayahs)
  const maxAyah = Math.max(...ayahs)

  return range(maxAyah - minAyah + 1, minAyah).map((ayah) => `${surah}:${ayah}`)
}

// We're generating keys, instead of collecting keys from lines using `reduce` because some verse are hidden like `1:4`
const getAllKeys = (lines) => {
  const normalLines = lines.filter(normalLine)

  const maxSurah = Math.max(...normalLines.map((line) => line[0]))
  const minSurah = Math.min(...normalLines.map((line) => line[0]))

  const surahs = range(maxSurah - minSurah + 1, minSurah)

  const keys = surahs.map((surah) => generateKeys(surah, lines))

  return removeLastItem(flatten(keys))
}

const findKey = (lines, key) => {
  const normalLines = lines.filter(normalLine)

  const found = normalLines.find((line) => {
    const currentLineKey = getKey(line)
    return currentLineKey === key
  })

  return !!found || false
}

module.exports = {
  getAllKeys,
  getKey,
  findKey,
}
