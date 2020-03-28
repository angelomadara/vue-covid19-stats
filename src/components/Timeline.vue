<template>
    <div>
        Historical data of {{ country }}
        <bar-chart 
            :data="data"
            label-rotate 
            zoom
            :zoom-range="zoomRange"
            style="height:500px !important"
        />
        <!-- <line-chart
            :data="data"
            area
            animation='false'
            style="height:500px !important"
        /> -->
    </div>
</template>

<script>
import { EventBus } from '../event-bus.js'
export default {
    // confirmed, recovered, deaths
    // 
    data(){
        return {
            country : '',
            data : [],
            zoomRange : [],
        }
    },
    created(){
        EventBus.$on('showTimeline',str => {
            this.country = str
            this.timeline(str)
        })
    },
    methods: {
        timeline(str){
            str = ""+str.toLowerCase()
            this.axios.get(this.coronaApi+`v2/historical/`+str).then(res => {
                // console.log(res.data)
                let rawCases = res.data.timeline.cases
                let cases = []; let x = 0;
                Object.keys(rawCases).forEach(element => {
                    // console.log(element,cases[element])
                    cases[x] = {'label':element,'value':rawCases[element]}
                    x++
                });
                
                let rawDeaths = res.data.timeline.deaths
                let deaths = []; let y = 0;
                Object.keys(rawDeaths).forEach(element => {
                    deaths[y] = {'label':element,'value':rawDeaths[element]}
                    y++
                })

                this.zoomRange = [80,100]
                
                this.data = [
                    {
                        name : 'Cases',
                        data : cases
                    },
                    {
                        name : 'Deaths',
                        data : deaths
                    }
                ]
            })
        }
    }
}
</script>

<style>
.chart {
  width: 100%;
  height: 300px;
}
</style>