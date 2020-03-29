<template>
  <div class="container">
    <h1 class="text-center">2019-20 Coronavirus Pandemic Update</h1>
    <div>
      <p>API source: <a href="https://github.com/NovelCOVID/API" target="_blank">Github repo</a> or check the documetation on <a href="https://documenter.getpostman.com/view/8854915/SzS7R6uu?version=latest" target="_blank">postman</a>.</p>
      <p>Data source : <a href="https://www.worldometers.info/coronavirus/" target="_blank">https://www.worldometers.info/coronavirus/</a></p>
    </div>
    <navs></navs>
    <today></today>
    <hr>
    <timeline></timeline>
    <foot/>
    <!-- <news></news> -->
  </div>
</template>

<script>
import navs from './components/Navs'
import today from './components/Today'
import timeline from './components/Timeline'
import foot from './components/Footer'

export default {
  name: 'App',
  components: { today, navs, timeline, foot }
}
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
