const util = require('../../util/util')
const fs = require('fs')
const path = require('path')
const low = require('lowdb')

module.exports = {
	/**
	 * 获取所有的json文件数据库名字.
	 */
	getAllDbNames(){
		let dbFolderPath = path.resolve(__dirname, `../db`);
		let allDbNames = []
		fs.readdirSync(dbFolderPath).forEach(function(fileName){
			var filePath = path.join(dbFolderPath, fileName)
	 		var fileStats = fs.statSync(filePath)
	    if (!fileStats.isDirectory()) {
				var fileExt = util.getFileExtension(filePath)
				if(fileExt == 'json'){
					allDbNames.push(util.removeFileExtension(fileName))
				}
	    }
		})
		return allDbNames
	},
	/**
	 * 打开已存在的数据库，若不存在，返回false.
	 */
	openExistDB(dbName){
		if(dbName) {
			let dbFilePath = path.resolve(__dirname, `../db/${dbName}.json`);
			if(fs.existsSync(dbFilePath)) {
				return low(dbFilePath)
			}
		}
		return false
	},
	/**
	 * 打开json db连接, 若不存在，创建它.
	 */
	openDB(dbName, projectName) {
		let isNewDB = true
		let dbFilePath = path.resolve(__dirname, `../db/${dbName}.json`);
		if(fs.existsSync(dbFilePath)){
			isNewDB = false
		}
		let db = low(dbFilePath)
		if(isNewDB){
			db.defaults({
				projectName: projectName || dbName,
				apis: []
			}).write()
		}
		return db;
	},
	/**
	 * 删除指定的数据库.
	 */
	removeDB(dbName){
		let dbFilePath = path.resolve(__dirname, `../db/${dbName}.json`);
		if(fs.existsSync(dbFilePath)){
			fs.unlinkSync(dbFilePath);
		}
	},
	/**
	 * 获取所有的 api 列表
	 */
	getApiList(db){
		return db.get('apis').value()
	},
	/**
	 * 获取指定 api 的配置
	 */
	getApiSettings(db, api){
		return db.get('apis').find({name: api}).value()
	},
	/**
	 * 在开头处添加 api 设置.
	 */
	addApi(db, settings){
		settings['id'] = +new Date()
		db.get('apis').unshift(settings).write()
		return settings
	},
	/**
	 * 更新已存在的 api 设置
	 */
	updateApi(db, settings){
		db.get('apis').find({id: settings['id']}).assign(settings).write()
		return settings
	},
	/**
	 * 添加与更新共用
	 */
	saveApi(db, settings){
		if(settings['id']){
			return this.updateApi(db, settings)
		} else {
			return this.addApi(db, settings)
		}
	},
	/**
	 * 删除 api
	 */
	removeApi(db, id){
		db.get('apis').remove({id: id}).write()
		return db
	}
}
