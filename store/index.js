// holds your root state
export const state = () => ({
    //username: '',
    tree: {},
    selNode: {}
})
  
// contains your mutations
export const mutations = {
    /*setUsername(state, value) {
      state.username = value
    },*/
    setTree(state, value) {
        state.tree = value
    },
    setSelNode(state, value) {
        //console.log('setSelNode ' + value.name)
        state.selNode = value
        if (value.id <= 0) this.$router.push('/')
        else this.$router.push('/card')
    }
}

export const getters = {
    getParent( state ) {
        const stack = []
        stack.push(state.tree)
        do {
            var nd = stack.pop()
            //console.log('getParent ' + nd.name)
            if (nd.children && nd.children.length)
                for(let i = 0; i < nd.children.length; i++) {
                    if (nd.children[i].id == state.selNode.id) return nd;
                    else stack.push(nd.children[i])
                }
        } while (stack.length)
        return state.selNode
    }
}

export const actions = {
    async nuxtServerInit ({ commit }) {
        const response = await fetch("https://abp-oci1.tk/tree")
        const data = await response.json()
        commit('setTree', data)
    }
} 
 