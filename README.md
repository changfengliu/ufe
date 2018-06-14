## Summary

ufe(ultra front end toolset) 是美菜网内部前端开发使用的一个命令行工具集.
[http://www.meicai.cn/](http://www.meicai.cn/)

## Install

npm install cfe -g

## Usage

ufe &lt;command&gt; [options]

Command List

**ser**		
Start a local https(default) server

**new**		
Create a new file in the current directory according to the template file

**kp**		
Forced to kill the specific port process

**module**
Generate an es6 module reference manual of current dir

**excel2json**
Export a excel sheet to JSON file


## ufe ser [options]

启动一个本地https服务, 特点:
1. 内置默认ssl证书，不用拷贝证书路径了,简化配置。
2. 模糊匹配，如: 若访问/build/app.js,若未找到，则返回以 “/build/app.“开头的且最近修改的文件，这个特性在proxy to local时非常有用.
3. options中指定 -d或--php 可使用本地php-fpm解析php文件.

## ufe new [options]

在当前目录按内置模板新建文件，如vue,html文件，包含默认骨架代码，提高编码效率.

## ufe kp [options]
强制杀掉指定端口的关联进程

## ufe module [options]
生成当前目录中es6源文件的模块引用手册，辅助源码分析.

## ufe excel2json [options]
将excel文件的指定sheet数据导出到json文件，便于js操作或文案拷贝。解除手动拷贝粘贴的苦恼.

## Command Help Detail

type "ufe help command" in your shell
