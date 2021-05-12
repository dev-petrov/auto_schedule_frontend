<template>
  <div>
    <b-input placeholder="Фамилия" v-model="last_name"/>
    <b-button
      @click="$bvModal.show('modalTeacher')"
      block
      variant="primary"
      class="mt-2"
      >Добавить</b-button
    >
    <b-table :items="teachers" :fields="fields">
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
import ModalTeacher from "./modals/ModalTeacher.vue";

export default {
  components: { ModalTeacher },
  data() {
    return {
      fields: [
        {
          key: "last_name",
          label: "Фамилия",
          formatter: (value) => {
            return value;
          },
        },
        {
          key: "first_name",
          label: "Имя",
          formatter: (value) => {
            return value;
          },
        },
        {
          key: "middle_name",
          label: "Отчество",
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
      last_name: '',
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
    teachers() {
      return this.$store.state.teachers.filter((v) =>
        this.last_name !== '' ? v.last_name.toLowerCase().includes(this.last_name.toLowerCase()) : true
      );
    },
  },
  watch: {
    $route() {
      if (this.$route.query.modalType === "modalTeacher") {
        this.$bvModal.show("modalTeacher");
      }
    },
  },
};
</script>

<style>
</style>