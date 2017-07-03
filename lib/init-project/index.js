const fs = require('fs')
const ora = require('ora')
const path = require('path')
const inquirer = require("inquirer")
const download = require('download-git-repo')
const logger = require('../util/logger');

const taskName = 'init project'

module.exports = function(projectName){
	let cwd = process.cwd()
	let target = path.resolve(cwd, './', projectName);
	if(fs.existsSync(target)) {
		logger.fail('The current folder already exists for the same name project!')
	} else {
		const spinner = ora('Downloading project template ...').start();
		download(
			'changfengliu/comon-ui-project-template',
			target,
			{
				clone: false
			},
			function (err) {
			 	spinner.stop()
				if(err){
			  	logger.fail(err, taskName)
				} else {
					logger.success('Project [' + projectName + '] created!', taskName)
				}
			}
		)
	}
}
