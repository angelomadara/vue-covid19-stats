<template>
  <div class="row">
    <div class="col-12">
        <h5 class="text-center">Last Update: {{ lastUpdate() }}</h5>
    </div>
    <div class="col-5">
        <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action list-group-item-primary">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Case Count: {{ reports.cases | prettyNumber }}</h5>
                </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action list-group-item-secondary">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Death Count: {{ reports.deaths | prettyNumber }}</h5>
                </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action list-group-item-success">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Recoviries Count: {{ reports.recovered | prettyNumber }}</h5>
                </div>
            </a>
        </div>
    </div>
    <div class="col-6">

        <pie-chart :data="data"/>
    </div>
  </div>
</template>

<script>
export default {
    name : "Daily",
    data(){
        return {
            reports : {},
            data: [],
        }
    },
    created(){
        // var _this = this
        this.axios.get(this.coronaApi+`all`).then(res => {
            this.reports = res.data
            this.data = [
                {
                    name: 'Total Confirmed',
                    value: res.data.cases,
                },
                {
                    name: 'Total Recovered',
                    value: res.data.recovered,
                },
                {
                    name: 'Total Deaths',
                    value: res.data.deaths,
                },
            ]
        })
    },
    mounted(){
    },
    methods: {
        lastUpdate(){
            let date = new Date(this.reports.updated)
            return date.toLocaleString()
        },
    }
}
</script>

<style>

</style>