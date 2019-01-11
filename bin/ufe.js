#!/usr/bin/env node

require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('ser', '启动一个当前目录的http(s)服务')
  .command('new', '在当前目前新建一个文件,支持html,css,js,vue格式')
	.command('kp', '释放指定端口')
  .command('npm', '包管理工具')
  .parse(process.argv)
