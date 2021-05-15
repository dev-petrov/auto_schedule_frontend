<template lang="">
    <b-modal  id="modalTrainingDirection" @ok="saveTrainingDirection" title="Направление подготовки" @hidden="closeModal()">
        <div class="d-block">
          <b-input-group size="md" :prepend="'Название'">
            <b-form-input type="text" :value="name.name"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block">
          <b-input-group size="md" :prepend="'Код'">
            <b-form-input type="text" :value="name.code"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block">
        <label>Тип</label>
        <v-select
          v-model="name.type"
          id="type"
          :options="types"
          placeholder="Выберите тип"
          label='label'
          value='code'
          :reduce='(v) => v.code'
        ></v-select>
      </div>
      <constraint-table v-model='name.constraints' />
      <building-table v-model='name.building_constraints' />
    </b-modal>
</template>
<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import http from '../../http';
import ConstraintTable from '../ConstraintTable';
import BuildingTable from '../BuildingTable';

export default {
  components: {
    vSelect,
    ConstraintTable,
    BuildingTable,
  },
  data(){
    return{
      types: [
          {
              code: 'B',
              label: 'Бакалавриат',
          },
          {
              code: 'S',
              label: 'Специалитет',
          },
          {
              code: 'M',
              label: 'Магистратура',
          },
      ],
    }
  },
  computed:{
    name(){
      return this.$store.state.training_directions[this.$store.state.training_directions.findIndex(v => v.id == this.$route.query.id)] || {}
    }
  },
  watch:{
    $route(){
      this.disciplines = this.name.disciplines || [];
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
    },
    async saveTrainingDirection() {
      if (this.name.id){
        this.name.disciplines = this.disciplines;
        await http.updateItem('TrainingDirection', this.name.id, this.name, true);
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
<style lang="">
</style>