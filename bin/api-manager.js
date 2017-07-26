#!/usr/bin/env node
const meow = require('meow');
const cli = meow(`
  Usage
    $ ufe api
`);

let args = process.argv
if(args[2] == '-h' || args[2] == '-help' || args[2] == '--help'){
  cli.showHelp()
} else {
  let apiManager = require('../lib/api-manager/index')
}

//默认监听9090端口, https服务.
