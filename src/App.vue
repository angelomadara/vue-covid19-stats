<template>
  <div class="container">
    <h1 class="text-center">Covid19 Update</h1>
    <div>
      <p>API source: <a href="https://documenter.getpostman.com/view/8854915/SzS7R6uu?version=latest" target="_blank">Github repo</a> or check the documetation on <a href="https://documenter.getpostman.com/view/8854915/SzS7R6uu?version=latest" target="_blank">postman</a>.</p>
    </div>
    <navs></navs>
    <today></today>
    <hr>
    <cases></cases>
  </div>
</template>

<script>
import navs from './components/Navs'
import today from './components/Today'
import cases from './components/Cases'

export default {
  name: 'App',
  components: { today, navs, cases }
}
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
