#!/usr/bin/env node
const meow = require('meow');
const cli = meow(`
  Usage
    $ ufe excel2json excelFileName [sheetIndex(default 1)]

  Examples
    $ ufe excel2json data.xlsx
`);

let args = process.argv
let xlsxFileName = args[2]
let sheetIndex = args[3]

if(xlsxFileName == '-h' || xlsxFileName == '-help' || xlsxFileName == '--help' || !xlsxFileName){
  cli.showHelp()
} else {
	require('../lib/excel-json/index')(xlsxFileName, sheetIndex)
}
