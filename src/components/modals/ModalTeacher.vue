<template lang="">
    <b-modal  id="modalTeacher" @ok="saveTeacher" :title="name.last_name+' '+name.first_name+' '+name.middle_name" @hidden="closeModal()">
        <div class="d-block">
          <b-input-group size="md" :prepend="'Фамилия'">
            <b-form-input type="text" :value="name.last_name"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block">
          <b-input-group size="md" :prepend="'Имя'">
            <b-form-input type="text" :value="name.first_name"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block">
          <b-input-group size="md" :prepend="'Отчество'">
            <b-form-input type="text" :value="name.middle_name"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block">
          <b-input-group size="md" :prepend="'Кол-во часов'">
            <b-form-input type="number" :value="name.total_hours"></b-form-input>
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
  components: {
    vSelect,
  },
  data(){
    return{
      disciplines: [],
    }
  },
  computed:{
    name(){
      return this.$store.state.teachers[this.$store.state.teachers.findIndex(v => v.id == this.$route.query.id)] || {}
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
    async saveTeacher() {
      if (this.name.id){
        this.name.disciplines = this.disciplines;
        await http.updateItem('Teacher', this.name.id, this.name, true);
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