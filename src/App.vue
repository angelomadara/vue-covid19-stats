<template>
  <div class="container">
    <daily/>
  </div>
</template>

<script>
import daily from './components/Daily'
export default {
  name: 'App',
  components: {
    daily
  },
  data(){
    return {
      // msg : 'hello :)'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
