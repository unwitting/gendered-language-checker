const _ = require('lodash')
const wordcount = require('word-count')

const WORD_LIST = require('./word_list.js')
const DEBUG = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

function log(s) {
  if (!DEBUG) {return}
  console.log(s)
}

function analyseText(text) {

  const genders = _.keys(WORD_LIST)

  // Perform the regex tests
  const incidences = {}
  for (const gender of genders) {
    log(`Testing ${gender} word list`)
    incidences[gender] = []
    for (const regex of WORD_LIST[gender]) {
      const matches = text.match(regex)
      if (matches) {
        for (const match of matches) {
          const incidence = { regex, match: match.trim() }
          incidences[gender].push(incidence)
          log(`${incidences[gender].length} Found match for ${gender} regex ${incidence.regex}: ${incidence.match}`)
        }
      }
    }
  }

  // Post-process
  const overview = {}
  let total = 0

  for (const gender of genders) {
    overview[`${gender}`] = { count: incidences[gender].length }
    total += overview[gender].count
  }

  overview.gendered = { count: total }

  const totalWords = wordcount(text)
  overview.gendered.proportion = totalWords === 0 ? 0 : overview.gendered.count / totalWords

  for (const gender of genders) {
    overview[gender].proportion = totalWords === 0 ? 0 : overview[gender].count / totalWords
  }

  overview.all = { count: totalWords }

  // Return
  return { incidences, overview }

}

module.exports = { analyseText }
