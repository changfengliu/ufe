#!/usr/bin/env node
// cmd: mcfe-excel2json excelFileName sheetIndex
let logger = require('../lib/util/logger')

let args = process.argv
let xlsxFileName = args[2]
let sheetIndex = args[3]

require('../lib/excel-json/index')(xlsxFileName, sheetIndex)
