const path = require('path')
const fs = require('fs')

module.exports = function (templateName){
	if(templateName == 'htm'){
		templateName = 'html'
	}
	let templatePath = path.resolve( __dirname, '../templates/', templateName + '.tmp' )
	if(fs.existsSync(templatePath)){
		return {
			ret: 1,
			path: templatePath
		}
	} else {
		//若没有指定的模板文件，返回空模板文件的路径.
		return {
			ret: 0,
			path: path.resolve(__dirname, '../templates/empty.tmp')
		}
	}
}
