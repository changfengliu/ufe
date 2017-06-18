#!/usr/bin/env node
let logger = require('../lib/util/logger')

let args = process.argv
let xlsxFileName = args[2]
let sheetIndex = args[3]

if(xlsxFileName == '-h' || xlsxFileName == '-help' || xlsxFileName == '--help'){
  logger.sep()
  logger.help('Usage: mcfe excel2json excelFileName [sheetIndex(default 1)]')
  logger.help('Example: mcfe excel2json data.xlsx')
  logger.sep()
} else {
	require('../lib/excel-json/index')(xlsxFileName, sheetIndex)
}
