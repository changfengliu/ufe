window.util = {
	removeFileExtension(str, ext) {
	  if (!str) { return ''; }
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
}
