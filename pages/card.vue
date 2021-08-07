<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <v-card>
                <v-card-title>{{ item.name }}</v-card-title>
                <v-card-subtitle>{{ upper.name }}</v-card-subtitle>
            </v-card>
            <v-carousel>
                <v-carousel-item v-for="n in 5" :key="n">
                    <v-img src="item.photo"></v-img>
                </v-carousel-item>
            </v-carousel>
            <v-card-text>
                {{ text }}
            </v-card-text>
            <v-card-actions>
                <v-btn text @click="up">Вверх</v-btn>
                <v-btn v-if="details['mam']" text @click="parent(details['mamID'])">Мать</v-btn> 
                <v-btn v-if="details['dad']" text @click="parent(details['dadID'])">Отец</v-btn> 
            </v-card-actions>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data: () => ({ details: { nick: 'nick', birthday: 'birthday', gender: 'gender', breed: 'breed', subbreed: 'subbreed', mam: 'mam', dad: 'dad' } }),
    computed: {
        item: function() {
            return this.$store.state.selNode
        },
        upper: function() {
            return this.$store.getters.upper
        },
        text: function() {
            let str = ""
            let gnd = { 'м': 'Кобель', 'д': 'Сука'}
            if (this.details['nick']) str += "Кличка: " + this.details['nick'] + ". "
            if (this.details['birthday']) str += "Дата рождения: " + this.details['birthday'] + ". "
            if (this.details['gender']) str += gnd[this.details['gender']] + ". "
            if (this.details['breed']) str += "Порода: " + this.details['breed'] + ". "
            if (this.details['subbreed']) str += "Уточнение: " + this.details['subbreed'] + ". "
            if (this.details['mam']) str += "Мать: " + this.details['mam'] + ". "
            if (this.details['dad']) str += "Отец: " + this.details['dad'] + ". "
            return str
        }
    },
    watch: {
        item: function() { 
            this.$fetch() 
        }
    },
    methods: {
        up: function() {
            this.$store.commit('setSelNode', this.upper)
        },
        parent: function(id) {
            console.log(id)
            this.$store.dispatch('setParent', id)
        }
    },
    async fetch() {
        if (!this.$nuxt.context.store.state.selNode.id || this.$nuxt.context.store.state.selNode.id <= 0) return
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
        //console.log(rsp)
        //console.log(rsp['birthday'])
        if (rsp) this.details = rsp
        //else this.details = deflt
    },
    fetchOnServer: false
}
</script>
