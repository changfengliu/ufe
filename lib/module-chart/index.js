var fs = require("fs")
var path = require("path")
var logger = require('../util/logger');
var util = require('../util/util'),

let root = path.resolve()
let aliasJSON = JSON.parse(fs.readFileSync(path.join(root, './alias.json')));

let importReg = /import\s+(.+|(\{[^}]*\}))\s+from\s+'([^']+)'/gmi

let fileDepsArr = []

scanDir(root)
writeChartJsonFile(fileDepsArr)

//-----------------------------------------------------------------------------

function writeChartJsonFile(fileDepsArr){
	fs.open("./chart.json", 'w', function(err, fd) {
	  if(err) {
	    console.log(err);
	  } else {
	    var buf = new Buffer(JSON.stringify(fileDepsArr));
	    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer){
				if(err){
					console.error(err)
				} else {
					console.log('done');
				}
			});
	  }
	})
}

function scanDir(currentDir){
	fs.readdirSync(currentDir).forEach(function(fileName){
		var pathName = path.join(currentDir, fileName);
 		var stats = fs.statSync(pathName);
    if (stats.isDirectory()) {
      if(fileName != 'node_modules'){
				scanDir(pathName)
			}
    } else {
			let fileContent = fs.readFileSync(pathName, 'utf-8');
			let importMatchArr = null
			let fileDeps = []
			do {
				importMatchArr = importReg.exec(fileContent);
				if(importMatchArr && importMatchArr.length){
					let depRelativePath = importMatchArr[3]
					let depRelativePathParts = depRelativePath.split('/')
					if(aliasJSON[depRelativePathParts[0]]){
						depRelativePath = depRelativePath.replace(depRelativePathParts[0], aliasJSON[depRelativePathParts[0]])
						depRelativePath = path.join(root, depRelativePath)
					} else {
						depRelativePath = path.join(currentDir, depRelativePath)
					}
					fileDeps.push(depRelativePath)
				}
			} while (importMatchArr != null)
			fileDepsArr.push({
				name: fileName,
				path: pathName,
				deps: fileDeps
			})
    }
	})
}
