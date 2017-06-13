#!/usr/bin/env node
'use strict'

console.log('mcfe Version: 1.0.9')
console.log('')

console.log('当前目录启动https server:');
console.log('mcfe-ser -p $RANDOM -o -S');
console.log('')

console.log('启动本地代理server.')
console.log('mcfe-proxy');
console.log('')

console.log('kill指定端口')
console.log('mcfe-kp portNumber');
console.log('')

console.log('当前目录创建新文件')
console.log('mcfe-new templateName newfileName ./output-dir');
console.log('')

console.log('将当前目录的excel文件内容导出json文件')
console.log('mcfe-excel2json excelFileName sheetIndex');
console.log('')
