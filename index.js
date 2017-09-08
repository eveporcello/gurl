var argv = require('minimist')(process.argv.slice(2))
var path = require('path')
var fs = require('fs')
var fetch = require('node-fetch')
require('console.json')

var graphiqlURL = argv.u || argv.url

if(!graphiqlURL) {
  console.error("A Graphiql URL must be provided")
  process.exit(1)
}

var queryFile = argv.q || argv.query
if(!queryFile) {
  console.error("A query file must be provided")
  process.exit(1)
}

fs.readFile(path.join(__dirname, queryFile), 'UTF-8', (err, query) => {
  if(err) {
    console.error("Cannot read the query file", err)
    process.exit(1)
  } else {
    fetch(`${graphiqlURL}?query=${query}`)
          .then(r => r.json())
          .then(json => JSON.stringify(json, null, 2))
          .then(console.log)
          .catch(err => {
            console.error("Cannot fetch from url", err)
            process.exit(1)
      })
  }
})
