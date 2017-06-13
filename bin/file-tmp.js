#!/usr/bin/env node

// cmd: mcfe-new vue [newfileName] [./output-dir]

const createFile = require('../lib/create-from-template')

let msg = require('../lib/msg.js')
let args = process.argv
let templateName = args[2]
let newfileName = args[3] || 'newfile'
let path = args[4] || './'

if(templateName){
	createFile(templateName, path, newfileName)
} else {
	msg.fail(`template Name is required!`)
}
