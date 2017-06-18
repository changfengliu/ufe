window.TreeNode = Vue.extend({
  name: 'TreeNode',
  props: ['node'],
  data() {
    return {
      open: false,
			isFolder: this.node.children && this.node.children.length,
      selected: false
    }
  },
  computed: {
    nodeCls(){
      var nodeClasses = []
      if(this.selected){
        nodeClasses.push('selected')
      }
      if(!this.isFolder){
        nodeClasses.push('leaf')
      } else {
        nodeClasses.push(this.open ? 'folder-open' : 'folder')
      }
      return nodeClasses.join(' ')
    }
  },
  methods: {
    toggle: function() {
      if(this.isFolder) {
        this.open = !this.open
      }
      this.selected = true
      this.$emit('selected', this.node, !this.isFolder, this)
    },
    selectNode(node, isLeaf, nodeCmp){
      this.$emit('selected', node, isLeaf, nodeCmp)
    },
    unselected(){
      this.selected = false
    }
  },
	template: `
		<li class="tree-node">
      <div
        @click='toggle'
        :title='node.fullname'
        class="node-item"
        :class="nodeCls"
      >
        {{node.name}}
      </div>
      <ul v-show="open" class="child-nodes">
        <TreeNode
          v-for="childNode in node.children"
          :key="childNode.fullname"
          :node='childNode'
          @selected="selectNode"
        ></TreeNode>
      </ul>
    </li>`
})
