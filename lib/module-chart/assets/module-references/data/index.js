window.dataParser = {
	getTreeData(){
		var meta = window.__data || [];
		this.meta = meta;
		var treeData = []
		for(var i=0, len=meta.length; i<len; i++){
			var moduleName = meta[i]['name']
			var moduleFullname = meta[i]['fullname']
			var pathArr = meta[i]['fullname'].slice(1).split('/')
			var children = treeData
			var prevChildFullname = ''
			for(var j=0; j<pathArr.length; j++){
				if(j == pathArr.length - 1){
					//叶子节点
					children.push({
						name: moduleName,
						fullname: moduleFullname
					})
				} else {
					//文件夹节点
					var child = this.addChildNode(children, pathArr[j], prevChildFullname)
					prevChildFullname = child['fullname']
					children = child['children']
				}
			}
		}
		console.log(treeData)
		this.treeData = treeData
		return this.sortTreeData(treeData)
	},
	/**
	 * 返回 child 节点
	 */
	addChildNode(children, name, prevChildFullname){
		for(var i=0; i<children.length; i++){
			if(children[i]['name'] == name){
				return children[i]
			}
		}
		children.push({
			name: name,
			fullname: prevChildFullname + '/' + name,
			children: []
		})
		return children[children.length - 1]
	},
	sortTreeData(treeData){
		var _this = this;
		treeData.sort(function(child1, child2){
			var flag = 0
			if(
				child1['children'] && child1['children'].length &&
				child2['children'] && child2['children'].length
			){
				if(child1['name'] > child2['name']){
					flag = 1
				}
			} else if(child2['children'] && child2['children'].length){
				flag = 1
			}
			if(child1['children'] && child1['children'].length){
				_this.sortTreeData(child1['children'])
			}
			if(child2['children'] && child2['children'].length){
				_this.sortTreeData(child2['children'])
			}
			return flag
		})
		return treeData
	},
	findDepByFullName(fullName){
		for(var i=0, len=this.meta.length; i<len; i++){
			var module = this.meta[i]
			if(module['fullname'] == fullName){
				return module['deps']
			}
		}
		return []
	},
	findRefsByFullName(fullName){
		var refs = []
		var fullNameWithoutExt = util.removeFileExtension(fullName)
		for(var i=0, len=this.meta.length; i<len; i++){
			var module = this.meta[i]
			var deps = module['deps'] || []
			if(deps.includes(fullName) || deps.includes(fullNameWithoutExt)){
				refs.push(module['fullname'])
			}
		}
		return refs
	}
}
