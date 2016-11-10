const _ = require('lodash')
const analyse = require('../analyse')

test('analyseText # correctly analyses feminine-coded language', () => {

  const text = 'Committed and affectionate? Join managers'
  const analysis = analyse.analyseText(text)

  expect(analysis.incidences.feminine.length).toBe(2)
  const incidenceMatches = _.map(analysis.incidences.feminine, inc => inc.match)
  expect(incidenceMatches).toContain('Committed')
  expect(incidenceMatches).toContain('affectionate')
  expect(analysis.incidences.masculine.length).toBe(0)
  expect(analysis.overview).toEqual({
    feminine: {
      count: 2,
      proportion: 0.4,
    },
    masculine: {
      count: 0,
      proportion: 0,
    },
    gendered: {
      count: 2,
      proportion: 0.4,
    },
    all: {
      count: 5,
    },
  })

})

test('analyseText # correctly analyses masculine-coded language', () => {

  const text = 'Aggressive and headstrong? Join managers'
  const analysis = analyse.analyseText(text)

  expect(analysis.incidences.masculine.length).toBe(2)
  const incidenceMatches = _.map(analysis.incidences.masculine, inc => inc.match)
  expect(incidenceMatches).toContain('Aggressive')
  expect(incidenceMatches).toContain('headstrong')
  expect(analysis.incidences.feminine.length).toBe(0)
  expect(analysis.overview).toEqual({
    feminine: {
      count: 0,
      proportion: 0,
    },
    masculine: {
      count: 2,
      proportion: 0.4,
    },
    gendered: {
      count: 2,
      proportion: 0.4,
    },
    all: {
      count: 5,
    },
  })

})

test('analyseText # correctly analyses uncoded language', () => {

  const text = 'Hello, nice to meet you'
  const analysis = analyse.analyseText(text)

  expect(analysis.incidences.feminine).toEqual([])
  expect(analysis.incidences.masculine).toEqual([])
  expect(analysis.overview).toEqual({
    feminine: {
      count: 0,
      proportion: 0,
    },
    masculine: {
      count: 0,
      proportion: 0,
    },
    gendered: {
      count: 0,
      proportion: 0,
    },
    all: {
      count: 5,
    },
  })

})

test('analyseText # correctly analyses empty string', () => {

  const text = ''
  const analysis = analyse.analyseText(text)

  expect(analysis.incidences.feminine).toEqual([])
  expect(analysis.incidences.masculine).toEqual([])
  expect(analysis.overview).toEqual({
    feminine: {
      count: 0,
      proportion: 0,
    },
    masculine: {
      count: 0,
      proportion: 0,
    },
    gendered: {
      count: 0,
      proportion: 0,
    },
    all: {
      count: 0,
    },
  })

})
