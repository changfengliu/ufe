const kill = require('./lib/kill')
var logger = require('../util/logger');
var taskName = 'kill port'

module.exports = function(port){

	if(parseInt(port) != port){
	  return logger.fail(`Invalid port format [${port}]`, taskName)
	}

	kill(port)
	  .then((result) => {
			if(typeof result == 'string'){
				logger.success(result, taskName)
			} else {
				logger.success(`Kill port ${port}(pid:${result.pid}) successfully.`, taskName)
			}
		})
	  .catch((err) => {
			logger.fail(
				typeof err == 'string' ? err : JSON.stringify(err),
				taskName
			)
		})
}
