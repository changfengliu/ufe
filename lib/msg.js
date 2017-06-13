var chalk = require('chalk');

module.exports = {
	success(txt, title){
		console.log(chalk.green((title || 'succeed') + ': ') + txt)
	},
	fail(txt, title){
		console.log(chalk.red((title || 'failed') + ': ') + txt)
	}
}
