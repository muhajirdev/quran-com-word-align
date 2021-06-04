const solution = require('./solution')

it('works', () => {
  const input = require('./data/page-ayah.json')
  const expected = require('./data/expected-output.json')

  const output = solution(input)

  expect(output).toEqual(expected)
})
