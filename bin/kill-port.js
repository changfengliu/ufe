#!/usr/bin/env node
const meow = require('meow');
const cli = meow(`
  Usage
    $ ufe kp portNumber

  Examples
    $ ufe kp 9999
`);

let args = process.argv
let port = args[2]

if(port == '-h' || port == '-help' || port == '--help' || !port){
  cli.showHelp()
} else {
  require('../lib/kill-port/index')(port)
}
