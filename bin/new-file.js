#!/usr/bin/env node
let logger = require('../lib/util/logger')
const createFile = require('../lib/new-file/index')

let args = process.argv
let extensionName = args[2]
let newfileName = args[3]

if(extensionName == '-h' || extensionName == '-help' || extensionName == '--help'){
  logger.sep()
  logger.help('Usage 1: mcfe-new newfileName.extensionName')
  logger.help('Usage 2: mcfe-new extensionName [newfileName]')
  logger.sep()
  logger.help('Example: mcfe-new App.vue')
  logger.help('Example: mcfe-new vue (will generate newfile.vue)')
	logger.help('Example: mcfe-new vue App')
  logger.sep()
} else {
  //兼容 mcfe-new newfile.vue 的情况
  if(extensionName && extensionName.indexOf('.') > -1){
    var fileNameParts = extensionName.split('.')
    newfileName = fileNameParts[0]
    extensionName = fileNameParts[1]
  }
	createFile(extensionName, newfileName)
}
