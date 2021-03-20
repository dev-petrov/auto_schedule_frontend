<template>
  <div id="app">
      <Nav />
      <router-view />
  </div>
</template>

<script>
import Nav from './components/Nav'
import ErrorModal from './plugins/ErrorModal'

export default {
  name:'app',
  components:{
    Nav
  },
  beforeMount() {
    ErrorModal.ErrorEvent.$on('show', (params) => {
      this.$bvModal.msgBoxOk(params.data, params.opts);
    });
    
  },
  async mounted() {
    await this.$store.dispatch('setGroups');
  }
}
</script>
<style>
#app {
  
}
</style>
