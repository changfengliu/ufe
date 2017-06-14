var fs = require('fs'),
  path = require('path'),
  union = require('union'),
  ecstatic = require('ecstatic'),
  httpProxy = require('http-proxy'),
  corser = require('corser'),
  logger = require('../util/logger'),
  findSimilarFile = require('./lib/findSimilarFile');

exports.HttpServer = exports.HTTPServer = HttpServer;

exports.createServer = function (options) {
  return new HttpServer(options);
}

function HttpServer(options) {
  options = options || {};
  this.root = './'
  this.headers = options.headers || {}
  this.contentType = options.contentType || 'application/octet-stream'
  // 允许跨域
  this.headers['Access-Control-Allow-Origin'] = '*';
  this.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Range';

  var before = options.before ? options.before.slice() : []

  //记录访问日志
  before.push(function (req, res) {
    logger.http(req, res);
    res.emit('next');
  })

  // favicon 图标处理.
  before.push(function (req, res) {
    if (req.url === '/favicon.ico') {
      var icoPath = path.resolve( __dirname, './assets/images/favicon.ico' )
      res.setHeader('Content-Type', 'image/x-icon');
      res.write(fs.readFileSync(icoPath, "binary"), "binary");
      return res.end()
    }
    res.emit('next');
  });

  //处理静态资源.
  before.push(ecstatic({
    root: './',
    cache: 1,
    showDir: true,
    autoIndex: true,
    gzip: false,
    contentType: this.contentType,
    handleError: typeof options.proxy !== 'string'
  }));

  //使用代理服务器
  if (options.proxy && typeof options.proxy === 'string') {
    var proxy = httpProxy.createProxyServer({});
    before.push(function (req, res) {
      proxy.web(req, res, {
        target: options.proxy,
        changeOrigin: true
      })
    })
  }

  //创建内部的 union server
  var unionOptions = {
    before: before,
    headers: this.headers,
    onError: function (err, req, res) {
      if(err.status == 404){
        var cwd = process.cwd()
        var filePath = cwd + req.url;
        var similarFile = findSimilarFile(filePath)
        if(similarFile){
          res.writeHead(200, {})  //重置响应状态码
          let fileContent = fs.readFileSync(similarFile['pathName'], 'utf-8');
          res.write(fileContent, "utf-8");
          err['transfer-url'] = similarFile['pathName'].replace(cwd, '')
          logger.http(req, res, err)
          return res.end()
        }
      }
      logger.http(req, res, err)
      res.end()
    }
  }
  if (options.ssl) {
    unionOptions.https = {
      cert: path.resolve(__dirname, './assets/pem/cert.pem'),
      key: path.resolve(__dirname, './assets/pem/key.pem')
    }
  }
  this.server = union.createServer(unionOptions)
}

HttpServer.prototype.listen = function () {
  this.server.listen.apply(this.server, arguments)
}

HttpServer.prototype.close = function () {
  return this.server.close()
}
