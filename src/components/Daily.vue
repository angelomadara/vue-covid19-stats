<template>
  <div class="row">
    <div class="col">
        <ul>
            <li>Case Count: {{ reports.cases | prettyNumber }}</li>
            <li>Death Count: {{ reports.deaths | prettyNumber }}</li>
            <li>Recoviries Count: {{ reports.recovered | prettyNumber }}</li>
            <li>Last Update: {{ lastUpdate() }}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import {Bar} from 'vue-chartjs'
export default {
    name : "Daily",
    extends: Bar,
    data(){
        return {
            reports : {},
        }
    },
    created(){
        this.axios.get(this.coronaApi+`all`).then(res => this.reports = res.data)
    },
    mounted(){
        
    },
    methods: {
        lastUpdate(){
            let date = new Date(this.reports.updated)
            return date.toLocaleString()
        }
    }
}
</script>

<style>

</style>