<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <v-card>
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle>{{ parent.name }}</v-card-subtitle>
            </v-card>
            <v-carousel>
                <v-carousel-item v-for="n in 5" :key="n">
                    <v-img :src="item.photo"></v-img>
                </v-carousel-item>
            </v-carousel>
            <v-card-text>
                <p v-for="(dt,name) in details" :key="name">{{name}}: {{ dt }}</p>
            </v-card-text>
            <v-card-actions>
                <v-btn text @click="up">Вверх</v-btn>
            </v-card-actions>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data: () => ({ details: {} }),
    computed: {
        item: function() {
            return this.$store.state.selNode
        },
        parent: function() {
            return this.$store.getters.getParent
        }
    },
    watch: {
        item: function() { 
            this.$fetch() 
        }
    },
    methods: {
        up: function() {
            this.$store.commit('setSelNode', this.parent)
        }
    },
    async fetch() {
        console.log(this.$nuxt.context.store.state.selNode.id)
        if (!this.$nuxt.context.store.state.selNode.id || this.$nuxt.context.store.state.selNode.id <= 0) {
            this.details = { nick: 'nick', birthday: 'birthday', breed: 'breed', subbreed: 'subbreed', mam: 'mam', dad: 'dad' }
            console.log(this.details)
            return
        }
        const jsn = JSON.stringify({ "id": this.$nuxt.context.store.state.selNode.id });
        console.log(jsn)
        const response = await fetch('https://abp-oci1.tk/details', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            //credentials: 'include',
            body: jsn
        })
        const rsp = await response.json()
        console.log(rsp)
        console.log(rsp['birthday'])
        if (rsp) this.details = ({ nick: rsp['nick'], birthday: rsp['birthday'], 
                        breed: rsp['breed'], subbreed: rsp['subbreed'], mam: rsp['mam'], dad: rsp['dad']})
        else this.details = { nick: 'nick', birthday: 'birthday', breed: 'breed', subbreed: 'subbreed', mam: 'mam', dad: 'dad' } 
    },
    fetchOnServer: false
}
</script>
