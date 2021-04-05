<template lang="">
    <b-modal id="modalGroup" :title="name.code" @hidden="closeModal()">
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
    </b-modal>
</template>
<script>

export default {
  props: ["groupID"],
  data() {
    return {
    };
  },
  computed:{
    name(){
      return this.$store.state.groups[this.$store.state.groups.findIndex(v => v.id == this.groupID)] || {training_direction:{}}
    }
  },
  methods:{
    closeModal(){
      var q = {...this.$route.query}
      this.$delete(q,"id")
      this.$delete(q,"modalType")
      this.$router.replace({
        name: this.$route.name,
        query: q
      })
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="">
</style>