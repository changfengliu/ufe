const fs = require('fs')
const inquirer = require('inquirer');
const cpFile = require('cp-file')
const path = require('path')

var logger = require('../util/logger');
var getTemplatePath = require('./lib/getTemplatePath');
var taskName = 'new file'

module.exports = function(extensionName, newfileName){
	if(extensionName){
		let source = getTemplatePath(extensionName)
		if(!source.ret){
			//若未找到指定的模板文件.
			inquirer.prompt([{
		    type: 'confirm',
		    message: 'The template file of your extension is not found, Create an empty newfile anyway?',
		    name: 'ok'
		  }]).then(answers => {
		    if (answers.ok) {
		      copyTemplateFile(source['path'], extensionName, newfileName)
		    }
		  })
		} else {
			copyTemplateFile(source['path'], extensionName, newfileName)
		}
	} else {
		logger.fail('Extension name of newfile is require.', taskName)
	}
}

function copyTemplateFile(templatePath, extensionName, newfileName){
	newfileName = newfileName || 'newfile'

	let cwd = process.cwd()
	let target = path.resolve(cwd, './', newfileName + '.' + extensionName);
	let copyAction = function(){
		cpFile(templatePath, target, {
			overwrite: true
		})
		.then(() => {
			let fileRelpath = target.replace(cwd, '')
			logger.success(`file ${fileRelpath} created.`, taskName)
		})
		.catch((err)=>{
			logger.fail(JSON.stringify(err), taskName)
		})
	}

	if(fs.existsSync(target)){
		//若有同名文件已存在，提示是否覆盖.
		inquirer.prompt([{
			type: 'confirm',
			message: 'There is a file with the same name at the target location, overwrite it?',
			name: 'ok'
		}]).then(answers => {
			if (answers.ok) {
				copyAction()
			}
		})
	} else {
		copyAction()
	}
}
