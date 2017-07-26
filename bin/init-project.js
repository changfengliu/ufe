#!/usr/bin/env node
const meow = require('meow');
const cli = meow(`
  Usage
    $ ufe init [projectName]
`);

var inquirer = require("inquirer")
var initProject = require('../lib/init-project/index')

let args = process.argv
let projectName = args[2]

if(projectName == '-h' || projectName == '-help' || projectName == '--help'){
  cli.showHelp()
} else {
  if(!projectName){
    //若没有项目名称，询问.
    inquirer.prompt([{
      type: 'input',
      name: 'projectName',
      message: 'Project name is?'
    }]).then(answers => {
      if(answers && answers['projectName']){
        initProject(answers['projectName'])
      }
    })
  } else {
    initProject(projectName)
  }
}
