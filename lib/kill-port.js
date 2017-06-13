const kill = require('kill-port')
var msg = require('./msg');

module.exports = function(port){
	kill(port)
	  .then(() => {
			msg.success(`process on port ${port} killed.`, 'kill port')
		})
	  .catch(() => {
			msg.fail(`could not kill process on port ${port}.`, 'kill port')
		})
}
