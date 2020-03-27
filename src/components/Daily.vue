<template>
  <div class="row">
    <div class="col">
        <ul>
            <li>Case Count: {{ reports.cases }}</li>
            <li>Death Count: {{ reports.deaths }}</li>
            <li>Recoviries Count: {{ reports.recovered }}</li>
            <li>Last Update: {{ reports.updated }}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name : "Daily",
    data(){
        return {
            reports : {}
        }
    },
    mounted(){
        this.ngayon()
    },
    methods:{
        ngayon(){
            this.axios.get(`https://corona.lmao.ninja/all`)
            .then(res => this.reports = res.data)
        }
    }
}
</script>

<style>

</style>