<template lang="">
    <b-modal id="modalGroup" @ok="saveGroup" :title="name.code" @hidden="closeModal()">
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
        <div class="d-block">
        <label>Дисциплины</label>
        <v-select
          multiple
          v-model="disciplines"
          id="disciplines"
          :options="$store.state.disciplines"
          placeholder="Выберите дисциплину"
          label='title'
          value='id'
        ></v-select>
      </div>
    </b-modal>
</template>
<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import http from '../../http';

export default {
  props: ["groupID"],
  components: {
    vSelect,
  },
  data() {
    return {
      disciplines: [],
    };
  },
  computed: {
    name() {
      return (
        this.$store.state.groups[
          this.$store.state.groups.findIndex((v) => v.id == this.groupID)
        ] || { training_direction: {} }
      );
    },
  },
  watch:{
    $route(){
      this.disciplines = this.name.disciplines || [];
    }
  },
  methods: {
    closeModal() {
      var q = { ...this.$route.query };
      this.$delete(q, "id");
      this.$delete(q, "modalType");
      this.$router.replace({
        name: this.$route.name,
        query: q,
      });
    },
    async saveGroup() {
      if (this.name.id){
        this.name.disciplines = this.disciplines;
        this.name.flow_id = this.name.flow.id;
        this.name.training_direction_id = this.name.training_direction.id;
        await http.updateItem('Group', this.name.id, this.name, true);
      }
      this.closeModal();
    }
  },
  async beforeMount() {
    if(this.$store.state.disciplines.length == 0){
      await this.$store.dispatch("setDisciplines");
    }
    this.disciplines = this.name.disciplines || [];
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="">
</style>