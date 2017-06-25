#!/usr/bin/env node

require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('ser', 'Start a local https(default) server')
  .command('new', 'Create a new file in the current directory according to the template file')
	.command('kp', 'Forced to kill the specific port process')
  .command('module', 'Generate an es6 module reference manual of current dir')
  .command('excel2json', 'Export a excel sheet to JSON file')
  .parse(process.argv)
