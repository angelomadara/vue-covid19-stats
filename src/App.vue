<template>
  <div class="container">
    <h1 class="text-center">Covid19 Update</h1>
    <today></today>
  </div>
</template>

<script>
import today from './components/Today'

export default {
  name: 'App',
  components: { today }
}
</script>

<style>
#app {
  color: #2c3e50;
}
</style>
