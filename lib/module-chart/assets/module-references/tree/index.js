window.Tree = Vue.extend({
  name: 'Tree',
  props: ['nodes'],
  data() {
    return {
			selectedNodeCmp: null
		}
  },
  computed: {},
  methods: {
		selectNode(node, isLeaf, nodeCmp){
			if(this.selectedNodeCmp){
				this.selectedNodeCmp.unselected()
			}
			this.selectedNodeCmp = nodeCmp
			this.$emit('select-node', node, isLeaf, nodeCmp)
		}
	},
	template: `
		<ul class="tree">
			<tree-node
				v-for="node in nodes"
				:node="node"
        :key="node.fullname"
				@selected="selectNode"
			></tree-node>
		</ul>`,
	components: {
		TreeNode: TreeNode
	}
})
