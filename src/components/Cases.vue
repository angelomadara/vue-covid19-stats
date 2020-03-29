<template>
  <div>
    <p> Sorted by cases per country </p>

      <b-input-group size="sm">
        <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Type to Search"></b-form-input>
        <b-input-group-append>
          <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
        </b-input-group-append>
      </b-input-group>
    <div id="country-cases-holder">

      <b-table id="country-table" index small striped hover bordered sticky-header :items="cases" :fields="fields" :filter="filter" >

        <template v-slot:cell(countryInfo)="data">
          <img :src="data.item.countryInfo.flag" alt="" width="20px" style='display:block;margin:6px auto'>
        </template>

        <template v-slot:cell(country)="data">
          <a href="javascript:void(0)" @click="thisTimeline(data.item.country)">{{ data.item.country }}</a>
        </template>

        <template v-slot:cell(cases)="data">
          {{ data.item.cases | prettyNumber }}
        </template>

        <template v-slot:cell(todayCases)="data">
          {{ data.item.todayCases | prettyNumber }}
        </template>

        <template v-slot:cell(deaths)="data">
          {{ data.item.deaths | prettyNumber }}
        </template>

        <template v-slot:cell(todayDeaths)="data">
          {{ data.item.todayDeaths | prettyNumber }}
        </template>

        <template v-slot:cell(recovered)="data">
          {{ data.item.recovered | prettyNumber }}
        </template>

        <template v-slot:cell(active)="data">
          {{ data.item.active | prettyNumber }}
        </template>

        <template v-slot:cell(critical)="data">
          {{ data.item.critical | prettyNumber }}
        </template>

      </b-table>

    </div>
  </div>
</template>

<script>
import {EventBus} from '../event-bus.js'
export default {
  data(){
    return{
      filter: '',
      cases : [],
      fields: [
        // { key: '#', label : '#', sortable: false },
        { key: 'countryInfo', label : '', sortable: false },
        { key: 'country', sortable: true },
        { key: 'cases', sortable: true },
        { key: 'todayCases', sortable: true },
        { key: 'deaths', sortable: true },
        { key: 'recovered', sortable: true },
        { key: 'active', sortable: true },
        { key: 'critical', sortable: true },
      ],
      countryTimeline: '',
      countries: [],
    }
  },
  created(){
    this.axios.get(this.coronaApi+`countries?sort=cases`).then(res => {
      
      /**
       * table data
       */
      this.cases = res.data

      /**
       * this data will be sent to Timeline.vue
       */
      let x = 0
      Object.keys(res.data).forEach(element => {
        // this.countries[x] = {'text':res.data[element].country,'value':res.data[element].country.toLowerCase()}
        this.countries[x] = res.data[element].country
        x++
      })
      this.countries = this.countries.sort()
      EventBus.$emit('listOfCountries',this.countries)
    })
  },
  computed:{
    rows() {
      return this.cases.length
    }
  },
  methods:{
    thisTimeline(str){
      EventBus.$emit('showTimeline',str)
    }
  }
}
</script>

<style>
  #country-cases-holder{
    height: 497px;
    overflow-y: scroll;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  #country-table{
    border-collapse: collapse; 
  }
  #country-table thead tr th{
    position: sticky;
    top: 0;
    background: #fff;
    cursor: pointer;
    /* border-bottom: 10px solid #ddd; */
    box-shadow: 0px -10px  0px #ddd, 5px 5px  10px #ddd;
  }
</style>