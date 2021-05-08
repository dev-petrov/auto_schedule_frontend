<template>
  <div>
    <v-select
      multiple
      v-model="teachers"
      id="teachers"
      :options="$store.state.teachers"
      placeholder="Выберите преподавателей"
      label="last_name"
      :reduce="(v) => v.id"
      value="id"
    ></v-select>
    <b-button
      @click="$bvModal.show('modalTeacher')"
      block
      variant="primary"
      >Добавить</b-button
    >
    <b-table :items="teacher" :fields="fields">
      <template #cell(edit)="row">
        <b-button
          class="btn btn-primary"
          @click="
            $router.replace({
              name: $route.name,
              query: {
                ...$route.query,
                id: row.item.id,
                modalType: 'modalTeacher',
              },
            })
          "
        >
          Редактировать
        </b-button>
      </template>
    </b-table>
    <ModalTeacher />
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import ModalTeacher from "./modals/ModalTeacher.vue";
export default {
  components: { ModalTeacher, vSelect },
  data() {
    return {
      fields: [
        {
          key: "last_name",
          label: "Ф",
          formatter: (value) => {
            return value;
          },
        },
        {
          key: "first_name",
          label: "И",
          formatter: (value) => {
            return value;
          },
        },
        {
          key: "middle_name",
          label: "О",
          formatter: (value) => {
            return value;
          },
        },
        {
          key: "total_hours",
          label: "Количество часов в неделю",
        },
        {
          key: "disciplines",
          label: "Дисциплины",
          formatter: (value) => {
            let arr = []
            for(let i in value){
              arr.push(value[i].title)
            }
            return arr.toString().replace("[", "").replace("]", "");
          },
        },
        {
          key: "edit",
          label: "",
        },
      ],
      teachers: [],
    };
  },
  async beforeMount() {
    if(this.$store.state.teachers.length == 0){
      await this.$store.dispatch("setTeachers");
    }
    if (this.$route.query.modalType === "modalTeacher") {
      this.$bvModal.show("modalTeacher");
    }
  },
  computed: {
    teacher() {
      return this.$store.state.teachers.filter((v) =>
        this.teachers.length != 0 ? this.teachers.includes(v.id) : true
      );
    },
  },
  watch: {
    $route() {
        console.log(this.teacher)
      if (this.$route.query.modalType === "modalTeacher") {
        this.$bvModal.show("modalTeacher");
      }
    },
  },
};
</script>

<style>
</style>