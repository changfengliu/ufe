#!/usr/bin/env node

// cmd: mcfe-excel2json excelFileName sheetIndex

const path = require('path')
let msg = require('../lib/msg.js')
let convertExcel = require('excel-as-json').processFile

let args = process.argv
let xlsxFileName = args[2]
let sheetIndex = args[3] || '1'

if(xlsxFileName){
	let src = path.resolve(process.cwd(), xlsxFileName + '.xlsx')
	let dst = path.resolve(process.cwd(), xlsxFileName + '.json')
	let options = {
		sheet: sheetIndex,
		isColOriented: false,
		omitEmtpyFields: false
	}
	convertExcel(src, dst, options, (err, data)=>{
		if(err){
			msg.fail(err, 'excel2json')
		} else {
			msg.success(dst, 'excel2json')
		}
	})
} else {
	msg.fail('excel file name is required!', 'excel2json')
}
