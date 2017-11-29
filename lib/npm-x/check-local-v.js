const path = require('path')
const chalk = require('chalk');
const Table = require('easy-table')

const sh = require('execa').shell
const cwd = process.cwd()

const printPackageVersionDiff = function(depsMap, from){
	let depsKey = Object.keys(depsMap || {})
	if(!depsKey.length){ return }
	let tablePrinter = new Table
	let tableData = []
	//获取本地包版本号
	depsKey.forEach(name=>{
		let moduleItem = {
			name: name,
			package: depsMap[name].replace('^', '')
		}
		try {
			let localModuleJson = require(path.join(cwd, `./node_modules/${name}/package.json`))
			moduleItem['local'] = localModuleJson['version']
		} catch(e) {
			moduleItem['local'] = ''
		}
		tableData.push(moduleItem)
	})
	//获取最新包版本
	let getLastestVersionTasks = []
	let lastestVersionMap = {}
	tableData.forEach(item=>{
		getLastestVersionTasks.push(sh(`npm show ${item.name} version`).then(result=>{
			lastestVersionMap[item['name']] = result['stdout']
		}))
	})
	Promise.all(getLastestVersionTasks).then(result=>{
		//格式化显示
		tableData.forEach((item)=>{
			tablePrinter.cell(`包名称(${from})`, chalk.grey(item['name']))
			//本地版本号
			let isSameVersion = (item['package'] == item['local'])
			if(item['local']) {
				tablePrinter.cell('本地包版本', chalk[isSameVersion ? 'grey' : 'yellow'](item['local'] + '(本地)'))
			} else {
				tablePrinter.cell('本地包版本', chalk.red('本地包未找到'))
			}
			//package.json版本号
			tablePrinter.cell('package.json声明版本', chalk[isSameVersion ? 'grey' : 'yellow'](item['package'] + '(package.json)'))

			let lastestVersion = lastestVersionMap[item['name']]
			tablePrinter.cell('最新包版本', chalk[item['package'] == lastestVersion ? 'grey' : 'red'](lastestVersion + '(最新)'))
			tablePrinter.cell('地址', chalk.grey(`https://www.npmjs.com/package/${item['name']}`))
			tablePrinter.newRow()
		})
		console.log('\n' + tablePrinter.toString())
	})
}

module.exports = function () {
	let packageConfig = require(path.join(cwd, './package.json'))
	printPackageVersionDiff(packageConfig['dependencies'], 'dependencies')
	printPackageVersionDiff(packageConfig['devDependencies'], 'devDependencies')
}
