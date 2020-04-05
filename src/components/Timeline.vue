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
                
                <p>Historical data of {{ country.label }}</p>
                
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
                        :zoom-range="zoomRange"
                        style="height:500px !important"
                        v-if="selected=='bar'"
                        :animation="false"
                        theme="purple-passion"
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
            country : 'Earth',
            data : [],
            zoomRange : [65,100],
            countries : [{label:'Earth',value:'Earth'}],
            worldData : [],
            kulay : ['red','green','blue'],
            updateStatus: "",
            test : []
        }
    },
    created(){
        EventBus.$on('showTimeline',str => {
            this.country = str
            // this.timeline(str.code)
            this.timelinev2(str.code)
        })

        EventBus.$on('listOfCountries',data =>{
            // this.countries = this.countries.concat(data)
            this.countries = data.sort()
        })

        
    },
    mounted(){
        // this.timeline(this.country)
        // this.world()
        this.worldv2()
    },
    methods: {
        getSelected(value){
            if(value.label == 'Earth'){
                this.worldv2()
            }else{
                this.timelinev2(value.code)
            }
        },
        graphChange(type){
            if(type == 'world'){
                this.worldv2()
            }else{
                this.timelinev2(type)
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
                // let totalDailyCase
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
                        'name' : 'Total Recovered',
                        'data' : totalRecovered.reverse(),
                    },
                    {
                        'name' : 'Total Deaths',
                        'data' : totalDeath.reverse()
                    },
                ]
            })
        },
        timeline(str){
            str = ""+str.toLowerCase()
            this.axios.get(`${this.coronaApi}v2/historical/${str}`,{
                onDownloadProgress: downloadEvent => {
                if (downloadEvent.type == 'progress')
                    this.updateStatus = "Loading Table"
                }
            })
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

                this.updateStatus = ""
            })
        },
        worldv2(){
            this.axios('https://corona.lmao.ninja/v2/historical/all')
            .then(res => {
                let totConfirmed = []
                let totalDeath = []
                let totalRecovered = []
                let x = 0; 
                let y = 0; 
                let z = 0;
                // let totalDailyCase
                Object.keys(res.data.cases).forEach(element => {
                    /**
                     * total confirmed
                     */
                    // let time = res.data[element].lastUpdated
                    totConfirmed[x] = {
                        'label' : element,
                        // 'label_complete' : res.data[element].lastUpdated,
                        'value' : res.data.cases[element],
                    }
                    x++
                })
                Object.keys(res.data.deaths).forEach(element => {
                    /**
                     * total deaths
                     */
                    totalDeath[y] = {
                        'label' : element,
                        'value' : res.data.deaths[element]
                    }
                    y++
                })
                Object.keys(res.data.recovered).forEach(element => {
                    /**
                     * total recoverd
                     */
                    totalRecovered[z] = {
                        'label' : element,
                        'value' : res.data.recovered[element]
                    }
                    z++
                })

                this.data = [
                    {
                        'name' : 'Total Confirmed',
                        'data' : totConfirmed
                    },
                    {
                        'name' : 'Total Recovered',
                        'data' : totalRecovered,
                    },
                    {
                        'name' : 'Total Deaths',
                        'data' : totalDeath
                    },
                ]
            })
        },
        timelinev2(str){
            str = ""+str.toLowerCase()+","
            this.axios.get(`${this.coronaApi}v2/historical/${str}/?lastdays=all`)
            .then(res => {
                
                let data = res.data[0]

                let cases = []; let x = 0; 
                let yesterdayCase = 0;
                let casePerDay = [];
                Object.keys(data.timeline.cases).forEach(element => {
                    /**
                     * total cases
                     */
                    cases[x] = {'label':element,'value':data.timeline.cases[element]}

                    /**
                     * new case per day
                     */
                    yesterdayCase = x==0 ? 0 : x-1
                    var value = data.timeline.cases[element] - cases[yesterdayCase].value
                    casePerDay[x] = {
                        'label': element,
                        'value': value < 0 ? 0 : value,
                    }

                    x++
                });

                let rawDeaths = data.timeline.deaths
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
                    var value = rawDeaths[element] - deaths[yesterdayDeath].value
                    deathPerDay[y] = {
                        'label' : element,
                        'value' : value < 0 ? 0 : value
                    }

                    y++
                })

                let rawRecovered = data.timeline.recovered;
                let recovered = []; 
                let z = 0;
                let yesterdayRecovered = 0;
                let recoveredPerDay = [];
                Object.keys(rawRecovered).forEach(element => {
                    /**
                     * total recovieries
                     */
                    recovered[z] = {'label':element,'value':rawRecovered[element]}
                    /**
                     * recovieries case per day
                     */
                    yesterdayRecovered = z==0 ? 0 : z-1
                    var value = rawRecovered[element] - recovered[yesterdayRecovered].value
                    recoveredPerDay[z] = {
                        'label' : element,
                        'value' : value < 0 ? 0 : value
                    }

                    z++
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
                        name : 'Total Recovered',
                        data : recovered
                    },
                    {
                        name : 'Cases per day',
                        data : casePerDay
                    },
                    {
                        name : 'Deaths per day',
                        data : deathPerDay
                    },
                    {
                        name : 'Recovered per day',
                        data : recoveredPerDay
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