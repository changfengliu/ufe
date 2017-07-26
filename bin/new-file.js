#!/usr/bin/env node
const meow = require('meow');
const cli = meow(`
  Usage
    $ ufe new newfileName.extensionName
    $ ufe new extensionName [newfileName]

  Examples
    $ ufe new App.vue
    $ ufe new vue (will generate newfile.vue)
    $ ufe new vue App
`);

const createFile = require('../lib/new-file/index')

let args = process.argv
let extensionName = args[2]
let newfileName = args[3]

if(extensionName == '-h' || extensionName == '-help' || extensionName == '--help'){
  cli.showHelp()
} else {
  //兼容 ufe-new newfile.vue 的情况
  if(extensionName && extensionName.indexOf('.') > -1){
    var fileNameParts = extensionName.split('.')
    newfileName = fileNameParts[0]
    extensionName = fileNameParts[1]
  }
	createFile(extensionName, newfileName)
}
