<template>
    <div>

        <div class="row">
            <div class="col-lg-12">
                <select v-model="country" @change='timeline(country)' name="" id="" class="form-control custom-select-sm" style="width:300px;display:inline-block;">
                    <option v-for="item in countries" 
                        :key="item.id" 
                        :value="item.toLowerCase()"
                    >
                        {{ item }}
                    </option>
                </select>
                
                <p>Historical data of {{ country }}</p>
                
                <div>
                    <!-- <b-form-group> -->
                        <b-form-radio v-model="selected" name="some-radios" value="bar" style="display:inline-block;margin-right:10px">Bar Graph</b-form-radio>
                        <b-form-radio v-model="selected" name="some-radios" value="line" style="display:inline-block;">Line Graph</b-form-radio>
                    <!-- </b-form-group> -->

                    <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
                </div>

                <bar-chart 
                    :data="data"
                    zoom
                    :zoom-range="zoomRange"
                    style="height:500px !important"
                    v-if="selected=='bar'"
                />
                <line-chart
                    :data="data"
                    zoom
                    :zoom-range="zoomRange"
                    style="height:500px !important"
                    v-else
                />
            </div>

            <div class="col-lg-6">

            </div>
        </div>
        
    </div>
</template>

<script>
import { EventBus } from '../event-bus.js'
export default {
    // confirmed, recovered, deaths
    // 
    data(){
        return {
            selected: 'bar',
            country : 'philippines',
            data : [],
            zoomRange : [80,100],
            countries : [],
        }
    },
    created(){
        EventBus.$on('showTimeline',str => {
            this.country = str
            this.timeline(str)
        })

        EventBus.$on('listOfCountries',data =>{
            this.countries = data
        })

        
    },
    mounted(){
        this.timeline(this.country)
    },
    methods: {
        world(){

        },
        timeline(str){
            str = ""+str.toLowerCase()
            this.axios.get(this.coronaApi+`v2/historical/`+str)
            .then(res => {
                // console.log(res.data)
                let rawCases = res.data.timeline.cases
                let cases = []; let x = 0; let yesterday = 0;
                let perday = [];
                Object.keys(rawCases).forEach(element => {
                    cases[x] = {'label':element,'value':rawCases[element]}
                    yesterday = x==0 ? 0 : x-1
                    perday[x] = {
                        'label':element,
                        'value':rawCases[element]-cases[yesterday].value,
                        // 't':rawCases[element],
                        // 'y':cases[yesterday].value
                    }
                    x++
                });

                let rawDeaths = res.data.timeline.deaths
                let deaths = []; let y = 0;
                Object.keys(rawDeaths).forEach(element => {
                    deaths[y] = {'label':element,'value':rawDeaths[element]}
                    y++
                })
                
                this.data = [
                    {
                        name : 'Total Cases',
                        data : cases
                    },
                    {
                        name : 'Total Deaths',
                        data : deaths
                    },
                    {
                        name : 'Cases confirmed at this day',
                        data : perday
                    }
                ]
            })

            // this.axios.get(`https://api.covid19api.com/country/philippines/status/confirmed/live`)
            // .then(res=>{
            //     console.log(res)
            // })
            // https://api.covid19api.com/country/philippines/status/confirmed/live
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