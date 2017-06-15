module.exports = {
	getFileExtension(path, opts) {
    if (!opts) opts = {};
		if(path.indexOf('?') > -1){
			path = path.split('?')[0]
		}
    if (!path) return "";
    var ext = (/[^./\\]*$/.exec(path) || [""])[0];
    return opts.preserveCase ? ext : ext.toLowerCase();
  }
}
