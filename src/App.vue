<template>
  <div id="app">
    <Nav />
    <Table :info="[names,times]" />
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
import Table from './components/Table.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Table
  }
}
</script>

<style>
#app {

}
</style>
