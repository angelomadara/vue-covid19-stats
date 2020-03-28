<template>
  <div class="row">
    <div class="col-12">
        <h5 class="text-center"></h5>
    </div>

    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <div class="text-center">Last Update: {{ lastUpdate() }}</div>
        <totalcasepie :data='data'></totalcasepie>
        <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">Total Confirmed: <span class="text-primary"><b>{{ reports.cases | prettyNumber }}</b></span></h6>
                </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">Total Deaths: <span class="text-secondary"><b>{{ reports.deaths | prettyNumber }}</b></span></h6>
                </div>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">Total Recovered: <span class="text-success"><b>{{ reports.recovered | prettyNumber }}</b></span></h6>
                </div>
            </a>
        </div>
    </div>

    <!-- <div class="col-lg-4 col-md-8 col-sm-12 col-xs-12">
        
    </div> -->

    <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
        <cases></cases>
    </div>
  </div>
</template>

<script>

import totalcasepie from './TotalCasesPie'
import cases from './Cases'

export default {
    components : {totalcasepie,cases},
    name : "Daily",
    data(){
        return {
            reports : {},
            data: [],
        }
    },
    created(){
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
.chart {
  width: auto !important;
  /* height: auto !important; */
  height: 400px !important;
}
</style>