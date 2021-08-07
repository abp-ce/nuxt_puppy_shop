<template>
    <v-container>
        <v-row>
            <v-col v-for="item in items" :key="item.id" cols="12" md="4">
                <v-card>
                    <v-card-title>{{ item.name }}</v-card-title>
                    <v-card-subtitle>{{ upper.name }} - {{ selNode.name }}</v-card-subtitle>
                    <v-img :src="item.photo"></v-img>
                    <v-card-actions>
                        <v-btn text @click="show(item)">Показать</v-btn>
                        <v-btn text @click="up">Вверх</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    computed: {
        selNode: function() {
            return this.$store.state.selNode
        },
        items: function() {
            return this.$store.state.selNode.children
        },
        upper: function() {
            return this.$store.getters.upper
        }
    },
    methods: {
        show: function(item) {
            //console.log(item.name)
            this.$store.commit('setSelNode', item)
        },
        up: function() {
            this.$store.commit('setSelNode', this.upper)
        }
    }
}
</script>
