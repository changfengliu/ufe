const cpFile = require('cp-file')
const path = require('path')
const fs = require('fs')
let msg = require('./msg')

module.exports = function(templateName, outpubPath, newfileName){
	let source = getTemplatePath(templateName)
	let target = path.resolve(process.cwd(), outpubPath, newfileName + '.' + templateName);
	cpFile(source, target, {
		overwrite: true
	}).then(() => {
		msg.success('file created at ' + target, 'create new file')
	}).catch((e)=>{
		msg.fail(e, 'create new file')
	})
}

function getTemplatePath(templateName){
	if(templateName == 'htm'){
		templateName = 'html'
	}
	let templatePath = path.resolve( __dirname, '../assets/templates/', templateName + '.tmp' )
	if(fs.existsSync(templatePath)){
		return templatePath
	} else {
		return path.resolve(__dirname, '../assets/templates/empty.tmp')
	}
}
