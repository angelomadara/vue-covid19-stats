<template>
  <div>
    <p>
      Sorted by cases per country
    </p>

    <b-input-group size="sm">
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
    <br>

    <b-table 
      id="country-table" 
      small striped hover bordered
      :items="cases" 
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
    ></b-table>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="country-table"
    ></b-pagination>

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

</style>