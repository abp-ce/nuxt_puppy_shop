<template>
    <v-container>
        <v-treeview :active.sync="selNode" :open.sync="opened" return-object activatable dense :items="tree"></v-treeview>
    </v-container>
</template>

<script>
export default {
    data: function() {
        return { 
            tree: [],
            opened: []
        }
    },
    mounted: function() {
        this.tree.push(this.$store.state.tree)
        this.opened.push(this.$store.state.tree)
        this.$store.commit('setSelNode', this.$store.state.tree)
    },
    computed: {
        selNode: {
            get() {
                if (!this.opened.includes(this.$store.state.selNode) && this.$store.state.selNode.id <= 0) this.opened.push(this.$store.state.selNode)
                if (this.$store.state.selNode.id > 0 && !this.opened.includes(this.$store.getters.upper)) this.opened.push(this.$store.getters.upper)
                return [this.$store.state.selNode]
            },
            set(value) {
                this.$store.commit('setSelNode', value[0])
            }
        }
    }
}
</script>

<style>

</style>