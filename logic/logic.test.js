const {
  getWordsPositions: getExplicitAyahWordsPosition,
} = require('./explicit-ayah')

const {
  getWordsPositions: getImplicitAyahWordsPosition,
} = require('./implicit-ayah')

it('test getWordsPosition 1:1', () => {
  const lines = [
    [1],
    [1, 1, 0],
    [1, 2, 0],
    [1, 3, 0],
    [1, 5, 0],
    [1, 6, 1],
    [1, 7, 3],
    [1, 7, 7],
    [1, 8, 0],
  ]

  const key = '1:1'
  const expected = [1, 1, 1, 1, 1]
  const totalWords = 5

  const output = getExplicitAyahWordsPosition(key, lines, totalWords)

  expect(output).toEqual(expected)
})

it('test getWordsPosition 1:4 (implicit ayah)', () => {
  const lines = [
    [1],
    [1, 1, 0],
    [1, 2, 0],
    [1, 3, 0],
    [1, 5, 0],
    [1, 6, 1],
    [1, 7, 3],
    [1, 7, 7],
    [1, 8, 0],
  ]

  const key = '1:4'
  const expected = [3, 3, 3, 3]
  const totalWords = 4

  const output = getImplicitAyahWordsPosition(key, lines, totalWords)

  expect(output).toEqual(expected)
})

it('test getWordsPosition 1:7 (implicit ayah at the end of surah, but not the end of page)', () => {
 
  // let's pretend that ayah 7 is on line 7 with 4 words. But it's implicit
  
  const lines = [
    [1],
    [1, 1, 0],
    [1, 2, 0],
    [1, 3, 0],
    [1, 5, 0],
    [1, 6, 1],
    [1, 6, 3],
    [1, 6, 5],
    [2],
    [2, 0],
    [2, 0, 1],
  ]

  const key = '1:7'
  const expected = [7,7,7,7]
  const totalWords = 4

  const output = getImplicitAyahWordsPosition(key, lines, totalWords)

  expect(output).toEqual(expected)
})

it('test getWordsPosition 1:7', () => {
  const lines = [
    [1],
    [1, 1, 0],
    [1, 2, 0],
    [1, 3, 0],
    [1, 5, 0],
    [1, 6, 1],
    [1, 7, 3],
    [1, 7, 7],
    [1, 8, 0],
  ]

  const key = '1:7'
  const expected = [5, 5, 5, 6, 6, 6, 6, 7, 7, 7]
  const totalWords = 10

  const output = getExplicitAyahWordsPosition(key, lines, totalWords)

  expect(output).toEqual(expected)
})
