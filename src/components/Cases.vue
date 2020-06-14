<template>
  <div>
    <p> <b>Sorted by cases per country [You can also sort it by clicking the table header]</b></p>

    <div class="row">
      <!-- <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <b-button variant="primary" @click="updateTable()" class=""> 
          <b-icon icon='arrow-repeat'></b-icon> {{ updateStatus }} 
        </b-button>
      </div> -->
      <div class="col"><b-form-input v-model="filter" type="search" id="filterInput" placeholder="Search country"></b-form-input></div>
    </div>
    
    <div id="country-cases-holder" style="margin-top:2px">

      <b-table id="country-table" 
        style="
          max-height: 541px;
        "
        sort-icon-left
        index small striped hover bordered sticky-header 
        :items="items" :fields="fields" :filter="filter" 
      >

        <template v-slot:cell(rank)="rank">
          <div class="text-center">{{ rank.index+1 }}</div>
          <!-- {{ rank.item.countryInfo }} -->
        </template>

        <template v-slot:cell(countryInfo)="data">
          <img :src="data.item.countryInfo.flag" alt="" width="20px" style='display:block;margin:6px auto'>
        </template>

        <template v-slot:cell(country)="data">
          <a v-if="data.item.countryInfo.iso2 != null" href="javascript:void(0)" @click="thisTimeline({label:data.item.country,code:data.item.countryInfo.iso2})">{{ data.item.country }}</a>
          <span v-else>{{data.item.country}}</span>
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
      sortDesc: false,
      filter: '',
      items : [],
      fields: [
        { key: 'rank', label : '#', sortable: false },
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
      // earth : ,
      updateStatus : 'Update Data',
    }
  },
  created(){
    this.casesPerCountry()
    EventBus.$on('forceUpdate',data => {
      if(data == true) this.casesPerCountry()
    })
  },
  computed:{
    rows() {
      return this.items.length
    }
  },
  methods:{
    thisTimeline(str){
      EventBus.$emit('showTimeline',str)
    },
    // updateTable(){
    //   this.casesPerCountry()
    //   EventBus.$emit('forceUpdate',true)
    // },
    casesPerCountry(){
      this.axios.get(`${this.coronaApi}v2/countries?sort=cases`,{
        onDownloadProgress: downloadEvent => {
          if (downloadEvent.type == 'progress')
            this.updateStatus = "Updating Data"
            // this is a sample comment
        }
      }).then(res => {
        
        /**
         * table data
         */
        this.items = res.data

        /**
         * this data will be sent to Timeline.vue
         */
        this.countries = []
        let x = 1
        this.countries[0] = {label:'Earth',value:'Earth'}
        Object.keys(res.data).forEach(element => {
          // this.countries[x] = {'text':res.data[element].country,'value':res.data[element].country.toLowerCase()}
          let item = res.data[element]
          if(item.country != "Diamond Princess")
            this.countries[x] = {label:item.country,code:item.countryInfo.iso2}
          x++
        })
        this.countries = this.countries.sort()
        EventBus.$emit('listOfCountries',this.countries)
        this.updateStatus = "Update Data"
      })
    }
  }
}
</script>

<style>
  /* #country-cases-holder{
    height: 497px;
    overflow-y: scroll;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  } */
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