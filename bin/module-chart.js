#!/usr/bin/env node
const meow = require('meow');
const cli = meow(`
  Usage
    $ ufe module
`);
let args = process.argv
if(args[2] == '-h' || args[2] == '-help' || args[2] == '--help'){
  cli.showHelp()
} else {
  require('../lib/module-chart/index')()
}
