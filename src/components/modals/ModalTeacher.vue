<template lang="">
    <b-modal  id="modalTeacher" @ok="saveTeacher" :title="teacher.last_name ? teacher.last_name+' '+teacher.first_name+' '+teacher.middle_name : 'Добавить преподавателя'" @hidden="closeModal()">
        <div class="d-block">
          <b-input-group size="md" :prepend="'Фамилия'">
            <b-form-input type="text" v-model="teacher.last_name"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block my-2">
          <b-input-group size="md" :prepend="'Имя'">
            <b-form-input type="text" v-model="teacher.first_name"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block">
          <b-input-group size="md" :prepend="'Отчество'">
            <b-form-input type="text" v-model="teacher.middle_name"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block my-2">
          <b-input-group size="md" :prepend="'Кол-во часов'">
            <b-form-input type="number" v-model="teacher.total_hours"></b-form-input>
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
          class='mb-2'
        ></v-select>
      </div>
      <label>Ограничения</label>
      <constraint-table v-model='teacher.constraints' />
    </b-modal>
</template>
<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import http from "../../http";
import ConstraintTable from "../ConstraintTable";

export default {
  components: {
    vSelect,
    ConstraintTable,
  },
  data() {
    return {
      disciplines: [],
    };
  },
  computed: {
    teacher() {
      return (
        this.$store.state.teachers[
          this.$store.state.teachers.findIndex(
            (v) => v.id == this.$route.query.id
          )
        ] || { constraints: [], first_name: '', last_name: '', middle_name: '', disciplines: [], total_hours: 0 }
      );
    },
  },
  watch: {
    $route() {
      this.disciplines = this.teacher.disciplines || [];
    },
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
    async saveTeacher() {
      if (this.teacher.id) {
        this.teacher.disciplines = this.disciplines;
        await http.updateItem("Teacher", this.teacher.id, this.teacher, true);
      } else {
        this.teacher.disciplines = this.disciplines;
        await http.createItem("Teacher", this.teacher, true);
      }
      this.closeModal();
    },
  },
  async beforeMount() {
    if (this.$store.state.disciplines.length == 0) {
      await this.$store.dispatch("setDisciplines");
    }
    this.disciplines = this.teacher.disciplines || [];
  },
};
</script>
<style lang="">
</style>