<template>
    <div>
        Historical data of {{ country }}
        <!-- <select name="" id="" class="form-control">
            <option v-for="item in countries" 
                :key="item.id" 
                :value="item.value"
                :v-model="country"
            >
                {{ item.text }}
            </option>
        </select> -->
        
        <div>
            <!-- <b-form-group> -->
                <b-form-radio v-model="selected" name="some-radios" value="bar">Bar Graph</b-form-radio>
                <b-form-radio v-model="selected" name="some-radios" value="line">Line Graph</b-form-radio>
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
</template>

<script>
import { EventBus } from '../event-bus.js'
export default {
    // confirmed, recovered, deaths
    // 
    data(){
        return {
            selected: 'bar',
            country : '',
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
            this.countries = data.sort()
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