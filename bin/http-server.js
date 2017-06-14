#!/usr/bin/env node
var os       = require('os'),
  path       = require('path'),
  colors     = require('colors'),
  opener     = require('opener'),
  portfinder = require('portfinder'),
  httpServer = require('../lib/http-server/index'),
  logger     = require('../lib/util/logger'),
  argv       = require('../lib/http-server/cmd').argv;

if (!argv['port'] || argv['port'] == 8080) {
  portfinder.basePort = 8080;
  //基于8080找一个可用的端口.
  portfinder.getPort(function (err, port) {
    if (err) {
      throw err;
    } else {
      listen(port);
    }
  });
} else {
  listen(argv['port']);
}

function listen(port) {
  var server = httpServer.createServer({
    proxy: argv['proxy'],
    ssl: argv['ssl']
  });

  server.listen(port, argv['host'], function () {
    var canonicalHost = argv['host'] === '0.0.0.0' ? '127.0.0.1' : argv['host'];  //若host是域名形式，则必须在系统host文件中指向127.0.0.1
    var protocol      = argv['ssl'] ? 'https://' : 'http://';

    //打印 http server 启动消息
    logger.info([
      'Starting up http-server, serving '.yellow,
      server.root.cyan,
      argv['ssl'] ? (' through'.yellow + ' https'.cyan) : '',
      '\nAvailable on:'.yellow
    ].join(''));

    //打印可用 url
    if (argv['host'] !== '0.0.0.0') {
      logger.info((protocol + canonicalHost + ':' + port.toString()).green);
    } else {
      var ifaces = os.networkInterfaces();
      Object.keys(ifaces).forEach(function (dev) {
        ifaces[dev].forEach(function (details) {
          if (details.family === 'IPv4') {
            logger.info((protocol + details.address + ':' + port.toString()).green);
          }
        })
      })
    }

    //启用代理
    if (argv['proxy'] && typeof argv['proxy'] === 'string') {
      logger.info('Unhandled requests will be served from: ' + argv['proxy']);
    }

    logger.info('Hit CTRL-C to stop the server');

    //自动在浏览器中打开首页地址
    if(argv.o) {
      opener(
        protocol + '//' + canonicalHost + ':' + port,
        {
          command: argv.o !== true ? argv.o : null
        }
      )
    }
  })
}

if (process.platform === 'win32') {
  require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  }).on('SIGINT', function () {
    process.emit('SIGINT')
  })
}

process.on('SIGINT', function () {
  logger.info('http-server stopped.'.red)
  process.exit()
})

process.on('SIGTERM', function () {
  logger.info('http-server stopped.'.red)
  process.exit()
})
