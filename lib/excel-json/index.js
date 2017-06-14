const path = require('path')
const fs = require('fs')

let logger = require('../util/logger')
let convertExcel = require('excel-as-json').processFile
let taskName = 'excel2json'

module.exports = function(xlsxFileName, sheetIndex){
	if(xlsxFileName){
		let src = path.resolve(process.cwd(), xlsxFileName + '.xlsx')
		if(fs.existsSync(src)){
			let dist = path.resolve(process.cwd(), xlsxFileName + '.json')
			let options = {
				sheet: sheetIndex || 1,	// from 1
				isColOriented: false,
				omitEmtpyFields: false
			}
			convertExcel(src, dist, options, (err, data)=>{
				if(err || !data){
					logger.fail(
						err ? err : 'No data in the sheet or sheet that does not exist',
						taskName
					)
				} else {
					logger.success(dist, taskName)
				}
			})
		} else {
			logger.fail('The excel file you specified is not found.', taskName)
		}
	} else {
		logger.fail('Excel file name is required.', taskName)
	}
}
