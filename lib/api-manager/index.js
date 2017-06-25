const fs = require('fs')
const union = require('union')
const director = require('director')

const util = require('../util/util')
const logger = require('../util/logger')

const taskName = 'Api Manager'
const router = new director.http.Router()
const db = require('./lib/db.js')

/**
 * 创建 api http server.
 */
var server = union.createServer({
  before: [
		function (req, res) {
      //所有请求允许跨域.
			res.setHeader('Access-Control-Allow-Origin', '*');
      res.emit('next');
		},
		function (req, res) {
      //启动功能性路由
			var accessRouter = router.dispatch(req, res);
      if (!accessRouter) {
        res.emit('next');
      }
		},
    function (req, res) {
			var url = req.url.toLowerCase()	// 格式如： /project-name/api/getcitys
			let projectDB = db.openExistDB(url.split('/')[1])
			if(projectDB) {
				let api = '/' + url.split('/').slice(2).join('/')
				let apiDetail = db.getApiSettings(projectDB, api)
        //若存在 api 定义，且http方法正确.
				if(apiDetail && apiDetail['method'].toUpperCase() == req['method']){
	        res.setHeader('Content-Type', 'application/json');
	        res.write(JSON.stringify(apiDetail['value']), "utf-8");
	        return res.end()
				}
			}
      res.emit('next')
    }
  ]
})

/**
 * 获取指定 project name的api列表.
 */
router.get(/mcfe-mocker-get-api-list/, function () {
	let apiList = []
  let dbName = this.req.query['id']
  let projectDB = db.openExistDB(dbName)
	if(projectDB) {
		apiList = db.getApiList(projectDB) || []
	}
  this.res.writeHead(200, { 'Content-Type': 'application/json' })
  this.res.end(JSON.stringify(apiList));
})

/**
 * 保存 api定义.
 */
router.post(/mcfe-mocker-save-api/, function () {
  let data = this.req['body']
  let projectDB = db.openDB(data['db'])
  let value = (typeof data['value'] == 'string') ? JSON.parse(data['value']) : data['value']
  db.saveApi(projectDB, data['oldapi'], {
    name: data['api'],
    method: data['method'] || 'get',
    value: value
  })
  this.res.writeHead(200, { 'Content-Type': 'application/json' })
  this.res.end('{"ret": 1}')
})

server.listen(9090)
logger.success('Api manage service is running on 9090', taskName)
