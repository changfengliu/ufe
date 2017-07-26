var fs = require("fs")
var path = require("path")
var inquirer = require("inquirer")
var logger = require('../util/logger')
var util = require('../util/util')
var jsonFormat = require('json-format')
var includes = require('array-includes')
var copy = require('recursive-copy')
const opn = require('opn');

let fileExts = ['js', 'vue', 'es6', 'json']

let root = path.resolve()
let fileDepsArr = []

let taskName = 'Generate module references'

module.exports = function(){
	let srcFolder = path.resolve( __dirname, './assets/module-references' )
	let target = path.resolve(process.cwd(), './module-references');
	let taskAction = function(options){
		copy(srcFolder, target, options || {})
			.then(function(results) {
	      scanDir(root)
				writeChartJsonFile(fileDepsArr)
	    })
	    .catch(function(error) {
	      logger.fail(JSON.stringify(error), taskName)
	    })
	}
	if(fs.existsSync(target)){
		//若文件已存在，提示是否重新生成.
		inquirer.prompt([{
			type: 'confirm',
			message: 'There is a module references folder at the target location, overwrite it?',
			name: 'ok'
		}]).then(answers => {
			if (answers.ok) {
				taskAction({
					overwrite: true
				})
			}
		})
	} else {
		taskAction()
	}
}

//-----------------------------------------------------------------------------

function writeChartJsonFile(fileDepsArr){
	fs.open("./module-references/data/meta.js", 'w', function(err, fd) {
	  if(err) {
	    logger.fail(JSON.stringify(err), taskName)
	  } else {
	    var buf = new Buffer('window.__data = ' + jsonFormat(fileDepsArr));
	    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer){
				if(err){
					logger.fail(JSON.stringify(err), taskName)
				} else {
					logger.success('Module references generated sucessfully.', taskName)
					opn('./module-references/index.html', {app: ['google chrome']})
					process.exit()
				}
			});
	  }
	})
}

let aliasFilePath = path.join(root, './alias.json')
let aliasJSON = {}
if(fs.existsSync(aliasFilePath)){
	aliasJSON = JSON.parse(fs.readFileSync(aliasFilePath))
}

let requireReg = /require\(\s*['"]([^'"]+)['"]\s*\)/gmi
let importReg = /import\s+(.+|(\{[^}]*\}))\s+from\s+'([^']+)'/gmi
function scanDir(currentDir){
	fs.readdirSync(currentDir).forEach(function(fileName){
		var filePath = path.join(currentDir, fileName)
 		var fileStats = fs.statSync(filePath)
    if (!fileStats.isDirectory()) {
			var fileExt = util.getFileExtension(filePath)
			if(!includes(fileExts, fileExt) || fileName == 'chart.json' || fileName == 'alias.json'){
				return;
			}
			let fileContent = fs.readFileSync(filePath, 'utf-8');
			let fileDeps = []
			let parseDepsPath = function(depRelativePath){
				let depRelativePathParts = depRelativePath.split('/')
				if(depRelativePathParts.length == 1){
					// node modules dep
					fileDeps.push(depRelativePathParts[0])
				} else {
					var pathAlias = depRelativePathParts[0]
					if(aliasJSON[pathAlias]){
						//使用了路径别名
						depRelativePath = depRelativePath.replace(pathAlias, aliasJSON[pathAlias])
					} else {
						//相对路径
						depRelativePath = path.join(currentDir, depRelativePath).replace(root, '')
					}
					fileDeps.push(depRelativePath)
				}
			}

			let requireMatchArr = null
			do {
				requireMatchArr = requireReg.exec(fileContent);
				if(requireMatchArr && requireMatchArr[1]){
					parseDepsPath(requireMatchArr[1])
				}
			} while (requireMatchArr != null)

			let importMatchArr = null
			do {
				importMatchArr = importReg.exec(fileContent);
				if(importMatchArr && importMatchArr[3]){
					parseDepsPath(importMatchArr[3])
				}
			} while (importMatchArr != null)

			fileDepsArr.push({
				name: fileName,
				fullname: filePath.replace(root, ''),
				deps: fileDeps
			})
    } else {
			if(fileName != 'node_modules' && fileName != 'module-references'){
				scanDir(filePath)
			}
    }
	})
}
