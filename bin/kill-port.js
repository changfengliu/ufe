#!/usr/bin/env node
let logger = require('../lib/util/logger')
let args = process.argv
let port = args[2]

if(port == '-h' || port == '-help' || port == '--help'){
  logger.sep()
  logger.help('Usage: mcfe kp port')
  logger.help('Example: mcfe kp 8080')
  logger.sep()
} else {
  require('../lib/kill-port/index')(port)
}
