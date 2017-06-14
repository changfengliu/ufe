var colors     = require('colors')
var userArgv = require('optimist')
  .usage('Usage: $0 -i [instance name] -a [pfq|psq] -h')
  .options('p', {
      'alias': 'port',
      'default': '8080',
      'describe': 'Specify a http port',
      'demand': false
  })
	.options('o', {
      'alias': 'open',
      'default': true,
			'boolean': true,
      'describe': 'Open in browser',
      'demand': false
  })
	.options('s', {
      'alias': 'ssl',
      'default': true,
			'boolean': true,
      'describe': 'Use https',
      'demand': false
  })
	.options('H', {
      'alias': 'host',
      'default': '0.0.0.0',
      'describe': 'Specify host',
      'demand': false
  })
  .options('P', {
      'alias': 'proxy',
      'default': '',
      'describe': 'Use as a http proxy',
      'demand': false
  })
  .options('h', {
      'alias': 'help',
      'describe': 'Help infomation'
  })
	.check(function(argv, a){
		if(parseInt(argv['port']) != argv['port'] || argv['port'] < 8000){
			console.error('\nPort must be an integer and > 8000!\n'.red)
			throw ''
		}
		return true;
	})

if(userArgv.argv['h']){
  userArgv.showHelp();
  process.exit();
}

module.exports = userArgv;