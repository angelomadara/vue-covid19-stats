<template>
    <div>

        <div class="row">
            <div class="col-lg-4">
                <v-select :options="countries" v-model="country" @input='getSelected'></v-select>
            </div>
            <div class="col-lg-12">
                <!-- <select v-model="country" @change='graphChange(country)' name="" id="" class="form-control custom-select-sm" style="width:300px;display:inline-block;">
                    <option value="world">EARTH</option>
                    <option v-for="item in countries" 
                        :key="item.id" 
                        :value="item.toLowerCase()"
                    >
                        {{ item }}
                    </option>
                </select> -->
                
                <p>Historical data of {{ country }}</p>
                
                <div>
                    <b-form-radio v-model="selected" name="some-radios" value="bar" style="display:inline-block;margin-right:10px">Bar Graph</b-form-radio>
                    <b-form-radio v-model="selected" name="some-radios" value="line" style="display:inline-block;">Line Graph</b-form-radio>
                </div>

                <div v-if="country != `world`">
                    <bar-chart 
                        :data="data"
                        zoom
                        :zoom-range="zoomRange"
                        style="height:500px !important"
                        v-if="selected=='bar'"
                        :animation="false"
                    />
                    <line-chart
                        :data="data"
                        zoom
                        smooth
                        :zoom-range="zoomRange"
                        style="height:500px !important"
                        v-else
                        :animation="false"
                    />
                </div>
                <div v-else>
                    <bar-chart 
                        :data="data"
                        zoom
                        smooth
                        :zoom-range="zoomRange"
                        style="height:500px !important"
                        v-if="selected=='bar'"
                        :animation="false"
                        :colors="kulay"
                    />
                    <line-chart
                        :data="data"
                        zoom
                        :zoom-range="zoomRange"
                        style="height:500px !important"
                        v-else
                        :animation="false"
                    />
                </div>

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
            country : '',
            data : [],
            zoomRange : [80,100],
            countries : ['Earth'],
            worldData : [],
            kulay : ['red','green','blue']
        }
    },
    created(){
        EventBus.$on('showTimeline',str => {
            this.country = str
            this.timeline(str)
        })

        EventBus.$on('listOfCountries',data =>{
            this.countries = this.countries.concat(data)
        })

        
    },
    mounted(){
        // this.timeline(this.country)
        this.world()
    },
    methods: {
        getSelected(value){
            if(value == 'Earth'){
                this.world()
            }else{
                this.timeline(value)
            }
        },
        graphChange(type){
            if(type == 'world'){
                this.world()
            }else{
                this.timeline(type)
            }
        },
        world(){
            this.axios('https://api.coronatracker.com/v3/stats/worldometer/totalTrendingCases').then(res => {
                /**
                 * world timeline
                 */
                let totConfirmed = []
                let totalDeath = []
                let totalRecovered = []
                Object.keys(res.data).forEach(element => {
                    /**
                     * total confirmed
                     */
                    let time = this.$options.filters.dateFormatAndTimezone(res.data[element].lastUpdated)
                    totConfirmed[element] = {
                        'label' : time,
                        // 'label_complete' : res.data[element].lastUpdated,
                        'value' : res.data[element].totalConfirmed,
                    }
                    /**
                     * total deaths
                     */
                    totalDeath[element] = {
                        'label' : time,
                        'value' : res.data[element].totalDeaths
                    }
                    /**
                     * total recoverd
                     */
                    totalRecovered[element] = {
                        'label' : time,
                        'value' : res.data[element].totalRecovered
                    }
                })

                this.data = [
                    {
                        'name' : 'Total Confirmed',
                        'data' : totConfirmed.reverse()
                    },
                    {
                        'name' : 'Total Deaths',
                        'data' : totalDeath.reverse()
                    },
                    {
                        'name' : 'Total Recovered',
                        'data' : totalRecovered.reverse()
                    }
                ]
            })
        },
        timeline(str){
            str = ""+str.toLowerCase()
            this.axios.get(this.coronaApi+`v2/historical/`+str)
            .then(res => {
                
                let rawCases = res.data.timeline.cases
                let cases = []; let x = 0; let yesterdayCase = 0;
                let casePerDay = [];
                Object.keys(rawCases).forEach(element => {
                    /**
                     * total cases
                     */
                    cases[x] = {'label':element,'value':rawCases[element]}

                    /**
                     * new case per day
                     */
                    yesterdayCase = x==0 ? 0 : x-1
                    casePerDay[x] = {
                        'label':element,
                        'value':rawCases[element]-cases[yesterdayCase].value,
                    }

                    x++
                });

                let rawDeaths = res.data.timeline.deaths
                let deaths = []; let y = 0;
                let yesterdayDeath = 0; let deathPerDay = [];
                Object.keys(rawDeaths).forEach(element => {
                    /**
                     * total deaths
                     */
                    deaths[y] = {'label':element,'value':rawDeaths[element]}
                    /**
                     * death case per day
                     */
                    yesterdayDeath = y==0 ? 0 : y-1
                    deathPerDay[y] = {
                        'label' : element,
                        'value' : rawDeaths[element] - deaths[yesterdayDeath].value
                    }

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
                        name : 'Cases per day',
                        data : casePerDay
                    },
                    {
                        name : 'Deaths per day',
                        data : deathPerDay
                    },
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