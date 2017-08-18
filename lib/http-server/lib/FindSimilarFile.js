var fs = require('fs'),
  path = require('path');

function rmExt (str, ext) {
  if (!str) {
    return '';
  }
  var reg = /\.[^/.]+$/;
  if (ext) {
    reg = new RegExp('\\.' + ext + '$');
  }
  var result = str.replace(reg, '');
  if (reg.test(result)) {
    return rmExt(result, ext);
  }
  return result;
}

module.exports = function(filePath){
	var dirName = path.dirname(filePath)
	var relFilePath = rmExt(filePath)
	var similarFile = null;
	var similarFiles = []
	//获取所有的相似文件信息.
  if(fs.existsSync(dirName)) {
  	fs.readdirSync(dirName).forEach(function(fileName){
  		var pathName = path.join(dirName, fileName);
   		var stats = fs.statSync(pathName);
      if (!stats.isDirectory() && pathName.indexOf(relFilePath) === 0) {
  			similarFiles.push({
  				pathName: pathName,
  				mtime: +(new Date(stats.mtime || stats.ctime))
  			})
      }
  	})
  }
	if(similarFiles.length){
		if(similarFiles.length > 1){
			//取最后修改过的一个
			similarFiles.sort(function(file1, file2){
				return file1.mtime < file2.mtime ? 1: 0
			})
		}
		similarFile = similarFiles[0]
	}
	return similarFile;
}
