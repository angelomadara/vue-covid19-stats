<template>
    <div>
        <ul>
            <li v-for="news in balita.articles" :key="news.id">
                {{ news.author }}
            </li>
        </ul>
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