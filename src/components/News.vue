<template>
    <div>
        <b-card-group deck v-for="news in balita.articles" :key="news.id">
            <b-card
                header="featured"
                header-tag="header"
                title="Title"
            >
                <b-card-text>Header and footers using props.</b-card-text>
                <b-card-text>{{ news.author }}</b-card-text>
                <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
export default {
    data(){
        return {
            balita : {}
        }
    },
    mounted(){
        this.axios.get(`${this.newsApi}?q=COVID&from=${this.today}&sortBy=publishedAt&apiKey=${this.newsApiToken}&pageSize=100&page=1`).then(res => {
            this.balita = res.data
        })
    }
}
</script>

<style>

</style>