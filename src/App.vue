<template>
  <div id="app">
      <Nav />
      <Table />
  </div>
</template>

<script>
import Nav from './components/Nav'
import Table from './components/Table'

export default {
  name:'app',
  components:{
    Nav,
    Table
  }
}
</script>
<style>
#app {
  
}
</style>
