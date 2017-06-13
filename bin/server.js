#!/usr/bin/env node

// cmd: mcfe-ser params

var colors     = require('colors'),
  os         = require('os'),
  path       = require('path'),
  httpServer = require('../lib/http-server/lib/http-server'),
  printHelp = require('../lib/http-server/lib/print-help'),
  portfinder = require('portfinder'),
  opener     = require('opener'),
  argv       = require('optimist')
    .boolean('cors')
    .argv;

var ifaces = os.networkInterfaces();

if (argv.h || argv.help) {
  printHelp()
  process.exit();
}

var port = argv.p || parseInt(process.env.PORT, 10),
    host = argv.a || '0.0.0.0',
    ssl = !!argv.S || !!argv.ssl,
    proxy = argv.P || argv.proxy,
    utc = argv.U || argv.utc,
    logger;

if (!argv.s && !argv.silent) {
  logger = {
    info: console.log,
    request: function (req, res, error) {
      var date = utc ? new Date().toUTCString() : new Date();
      if (error) {
        logger.info(
          '[%s] "%s %s" Error (%s): "%s"',
          date, req.method.red, req.url.red,
          error.status.toString().red, error.message.red
        );
      }
      else {
        logger.info(
          '[%s] "%s %s" "%s"',
          date, req.method.cyan, req.url.cyan,
          req.headers['user-agent']
        );
      }
    }
  };
}
else if (colors) {
  logger = {
    info: function () {},
    request: function () {}
  };
}

if (!port) {
  portfinder.basePort = 8080;
  portfinder.getPort(function (err, port) {
    if (err) { throw err; }
    listen(port);
  });
}
else {
  listen(port);
}

function listen(port) {
  var options = {
    root: argv._[0],
    cache: argv.c,
    showDir: argv.d,
    autoIndex: argv.i,
    gzip: argv.g || argv.gzip,
    robots: argv.r || argv.robots,
    ext: argv.e || argv.ext,
    logFn: logger.request,
    proxy: proxy
  };

  if (argv.cors) {
    options.cors = true;
    if (typeof argv.cors === 'string') {
      options.corsHeaders = argv.cors;
    }
  }

  if (ssl) {
    options.https = {
      cert: argv.C || argv.cert || path.resolve(__dirname, '../lib/http-server/pem/cert.pem'),
      key: argv.K || argv.key || path.resolve(__dirname, '../lib/http-server/pem/key.pem')
    };
  }

  var server = httpServer.createServer(options);
  server.listen(port, host, function () {
    var canonicalHost = host === '0.0.0.0' ? '127.0.0.1' : host,
        protocol      = ssl ? 'https://' : 'http://';

    logger.info(['Starting up http-server, serving '.yellow,
      server.root.cyan,
      ssl ? (' through'.yellow + ' https'.cyan) : '',
      '\nAvailable on:'.yellow
    ].join(''));

    if (argv.a && host !== '0.0.0.0') {
      logger.info(('  ' + protocol + canonicalHost + ':' + port.toString()).green);
    }
    else {
      Object.keys(ifaces).forEach(function (dev) {
        ifaces[dev].forEach(function (details) {
          if (details.family === 'IPv4') {
            logger.info(('  ' + protocol + details.address + ':' + port.toString()).green);
          }
        });
      });
    }

    if (typeof proxy === 'string') {
      logger.info('Unhandled requests will be served from: ' + proxy);
    }

    logger.info('Hit CTRL-C to stop the server');
    if (argv.o) {
      opener(
        protocol + '//' + canonicalHost + ':' + port,
        { command: argv.o !== true ? argv.o : null }
      );
    }
  });
}

if (process.platform === 'win32') {
  require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  }).on('SIGINT', function () {
    process.emit('SIGINT');
  });
}

process.on('SIGINT', function () {
  logger.info('http-server stopped.'.red);
  process.exit();
});

process.on('SIGTERM', function () {
  logger.info('http-server stopped.'.red);
  process.exit();
});
