#!/usr/bin/env node
const meow = require('meow');
const cli = meow(`
  Usage
    $ ufe npm
`);
let args = process.argv
if(args[2] == '-h' || args[2] == '-help' || args[2] == '--help'){
  cli.showHelp()
} else {
  let npmx = require('../lib/npm-x/index')
  if(args[2] == '-l'){
    npmx.checkLocalVersion()
  }
}
