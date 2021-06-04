const solution = require('./solution')

it('works', () => {
  const input = require('./data/page-ayah.json')
  const expected = require('./data/expected-output.json')

  const output = solution(input)

  expect(output).toEqual(expected)
})

it('handle the implicit ayah corner case, surah ends, middle of the page', () => {

  
  const input = [
    [
      [1],
      [1, 1, 0],
      [1, 2, 0],
      [1, 3, 0],
      [1, 5, 0],
      [1, 6, 1],
      [1, 6, 2],
      [1, 6, 3],
      [2],
      [2, 1, 0],
      [2, 2, 0],
      [2, 3, 0],
    ],
  ]

  const expected = [
    {
      '1:1': { page: 1, words: [1, 1, 1, 1, 1] },
      '1:2': { page: 1, words: [2, 2, 2, 2, 2] },
      '1:3': { page: 1, words: [3, 3, 3] },
      '1:4': { page: 1, words: [3, 3, 3, 3] },
      '1:5': { page: 1, words: [4, 4, 4, 4, 4] },
      '1:6': { page: 1, words: [4, 5, 6, 7] },
      '1:7': { page: 1, words: [7, 7, 7, 7, 7, 7, 7, 7, 7, 7] },
      '2:1': { page: 1, words: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9] },
      '2:2': { page: 1, words: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10] },
    },
  ]

  const output = solution(input)
  expect(output).toEqual(expected)
})
