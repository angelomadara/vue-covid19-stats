<template>
  <div class="row">
    <div class="col-12">
        <h5 class="text-center"></h5>
    </div>

    <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
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
        <br>
        <b-button variant="primary"  class="" @click="updateTable()" style="width:100%;"> 
          <b-icon icon='arrow-repeat'></b-icon> {{ forceUpdateText }}
        </b-button>
    </div>

    <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
        <cases></cases>
    </div>
  </div>
</template>

<script>

import totalcasepie from './TotalCasesPie'
import cases from './Cases'
import { EventBus } from '../event-bus.js'

export default {
    components : {totalcasepie,cases},
    name : "Daily",
    data(){
        return {
            reports : {},
            data: [],
            forceUpdateText : 'Force Update Data'
        }
    },
    created(){
        this.worldCount()
        // EventBus.$on('forceUpdate',data => {
        //     if(data == true) this.worldCount()
        // })
    },
    mounted(){
    },
    methods: {
        lastUpdate(){
            let date = new Date(this.reports.updated)
            return date.toLocaleString()
        },
        worldCount(){
            this.axios.get(this.coronaApi+`v2/all`,{
                onDownloadProgress: downloadEvent => {
                    // console.log(downloadEvent.srcElement.getResponseHeader('content-length'))
                    // console.log(downloadEvent)
                if (downloadEvent.type == 'progress')
                    this.forceUpdateText = "Updating Data"
                }
            }).then(res => {
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
                this.forceUpdateText = 'Force Update Data'
            })
        },
        updateTable(){
            this.worldCount()
            EventBus.$emit('forceUpdate',true)
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