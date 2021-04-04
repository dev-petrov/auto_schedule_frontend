<template lang="">
    <b-modal id="modalGroup" :title="name.code">
      <div class="d-block">
          <b-input-group size="md" :prepend="'Направление'">
            <b-form-input type="text" :value="name.training_direction.name"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block">
          <b-input-group size="md" :prepend="'Размер'">
            <b-form-input type="number" :value="name.count_of_students"></b-form-input>
          </b-input-group>
        </div>
        <!--<multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true">
          <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span></template>
        </multiselect> -->
  <pre class="language-json"><code>{{ value  }}</code></pre>
    </b-modal>
</template>
<script>
//import Multiselect from "vue-multiselect";
//Vue.component('multiselect', Multiselect)

export default {
  props: ["name"],
  //components: { Multiselect },
  data() {
    return {
      //options:[],
      param: this.$route.name,
    };
  },
  computed: {
    options() {
      var tmp = [];
      for (var i in this.name.disciplines) {
        tmp += i.title;
      }
      return tmp;
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="">
</style>