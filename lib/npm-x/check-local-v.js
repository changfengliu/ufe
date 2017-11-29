const path = require('path')
const chalk = require('chalk');
const Table = require('easy-table')

const sh = require('execa').shell
const cwd = process.cwd()

const printPackageVersionDiff = function(depsMap, from){
	let depsKey = Object.keys(depsMap || {})
	if(!depsKey.length){ return }
	var tablePrinter = new Table
	let tableData = []
	depsKey.forEach(name=>{
		let moduleItem = {
			name: name
		}
		try {
			let localModuleJson = require(path.join(cwd, `./node_modules/${name}/package.json`))
			let version = depsMap[name].replace('^', '')
			let color = localModuleJson['version'] == version ? 'cyan' : 'yellow'
			moduleItem['local'] = chalk[color](localModuleJson['version'] + '(本地)')
			moduleItem['package'] = chalk[color](version + '(package.json)')
		} catch(e) {
			moduleItem['local'] = chalk.red('本地包未找到')
			moduleItem['package'] = ''
		}
		tableData.push(moduleItem)
	})
	tableData.forEach((item)=>{
		tablePrinter.cell(`包名称(${from})`, chalk.cyan(item['name']))
		tablePrinter.cell('本地包版本', item['local'])
		tablePrinter.cell('package.json声明版本', item['package'])
		tablePrinter.newRow()
	})
	console.log(tablePrinter.toString())
}

module.exports = function () {
	let packageConfig = require(path.join(cwd, './package.json'))
	printPackageVersionDiff(packageConfig['dependencies'], 'dependencies')
	printPackageVersionDiff(packageConfig['devDependencies'], 'devDependencies')
}
