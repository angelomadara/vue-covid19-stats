<template>
  <div id="country-cases-holder">

    <!-- <b-input-group size="sm">
      <b-form-input
        v-model="filter"
        type="search"
        id="filterInput"
        placeholder="Type to Search"
      ></b-form-input>
      <b-input-group-append>
        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
      </b-input-group-append>
    </b-input-group>
    <br> -->

    <b-table 
      id="country-table" 
      small striped hover bordered sticky-header
      :items="cases" 
      :fields="fields"
      :filter="filter"
    ></b-table>

      <!-- :per-page="perPage"
      :current-page="currentPage" -->

    <!-- <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="country-table"
    ></b-pagination> -->

  </div>
</template>

<script>
export default {
  data(){
    return{
      filter: '',
      perPage: 10,
      currentPage: 1,
      cases : [],
      fields: [
        { key: 'country', sortable: true },
        { key: 'cases', sortable: true },
        { key: 'todayCases', sortable: true },
        { key: 'deaths', sortable: true },
        { key: 'recovered', sortable: true },
        { key: 'active', sortable: true },
        { key: 'critical', sortable: true },
      ],
    }
  },
  created(){
    this.axios.get(this.coronaApi+`countries?sort=cases`).then(res => {
      this.cases = res.data
    })
  },
  computed:{
    rows() {
      return this.cases.length
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
    box-shadow: 0px -10px  0px #ddd, 0px 5px  10px #ddd;
  }
</style>