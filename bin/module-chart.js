#!/usr/bin/env node
let logger = require('../lib/util/logger')
let args = process.argv
if(args[2] == '-h' || args[2] == '-help' || args[2] == '--help'){
  logger.sep()
  logger.help('Usage: ufe module')
  logger.sep()
} else {
  require('../lib/module-chart/index')()
}
