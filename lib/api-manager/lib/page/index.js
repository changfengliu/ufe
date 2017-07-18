module.exports = function(page, req, res, err){
	let fileContent = require('./' + page + '.js')(req, res, err);
	res.write(fileContent, "utf-8");
	return res.end()
}
