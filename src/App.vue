<template>
  <div class="container-fluid">
    <h1 class="text-center">2019-20 Coronavirus Pandemic Update</h1>
    <div>
      <p>API source: <a href="https://github.com/NovelCOVID/API" target="_blank">Github repo</a> or check the documetation on <a href="https://documenter.getpostman.com/view/8854915/SzS7R6uu?version=latest" target="_blank">postman</a>.</p>
    </div>
    <navs></navs>
    <today></today>
    <hr>
    <news></news>
  </div>
</template>

<script>
import navs from './components/Navs'
import today from './components/Today'
import news from './components/News'

export default {
  name: 'App',
  components: { today, navs, news }
}
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
