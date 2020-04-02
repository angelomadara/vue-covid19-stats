<template>
  <div class="container">
    <h1 class="text-center">2019-20 Coronavirus Pandemic Update</h1>
    <navs></navs>
    <today></today>
    <hr>
    <slide/>
    <br>
    <timeline></timeline>
    <foot/>
    
  </div>
</template>

<script>
import navs from './components/Navs'
import today from './components/Today'
import timeline from './components/Timeline'
import foot from './components/Footer'
import slide from './components/Slide'

export default {
  name: 'App',
  components: { today, navs, timeline, foot, slide }
}
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
