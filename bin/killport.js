#!/usr/bin/env node

// cmd: mcfe-kp portNumber

let msg = require('../lib/msg.js')
let args = process.argv
let port = parseInt(args[2])

if(port > 0){
  require('../lib/kill-port')(port)
} else {
  msg.fail(`invalid port format [${args[2]}]!`, 'kill port')
}
