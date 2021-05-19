<template>
  <div>
    <b-input placeholder="Название" v-model="title" />
    <b-button
      @click="$bvModal.show('modalDiscipline')"
      block
      variant="primary"
      class="mt-2"
      >Добавить</b-button
    >
    <b-table :items="disciplines" :fields="fields">
      <template #cell(edit)="row">
        <b-button
          class="btn btn-primary"
          @click="
            $router.replace({
              name: $route.name,
              query: {
                ...$route.query,
                id: row.item.id,
                modalType: 'modalDiscipline',
              },
            })
          "
        >
          Редактировать
        </b-button>
      </template>
    </b-table>
    <modal-discipline />
  </div>
</template>

<script>
import ModalDiscipline from "./modals/ModalDiscipline.vue";
export default {
  components: { ModalDiscipline },
  data() {
    return {
      fields: [
        {
          key: "title",
          label: "Название",
        },
        {
          key: "prof_type",
          label: "Тип аудитории",
          formatter: (value) => {
            let t = {
              S: "Обычная",
              C: "Компьютерная",
              D: "Дизайн",
              L: "Лаборатория",
              M: "Мастерская",
            };
            return t[value];
          },
        },
        {
          key: "type",
          label: "Тип дисциплины",
          formatter: (value) => {
            let t = {
              P: "Практика",
              LB: "Лаб. работа",
              L: "Лекция",
            };
            return t[value];
          },
        },
        {
          key: "edit",
          label: "",
        },
      ],
      title: "",
    };
  },
  async beforeMount() {
    if (this.$store.state.disciplines.length == 0) {
      await this.$store.dispatch("setDisciplines");
    }
    if (this.$route.query.modalType === "modalDiscipline") {
      this.$bvModal.show("modalDiscipline");
    }
  },
  computed: {
    disciplines() {
      return this.$store.state.disciplines.filter((v) =>
        this.title !== ""
          ? v.title.toLowerCase().includes(this.title.toLowerCase())
          : true
      );
    },
  },
  watch: {
    $route() {
      if (this.$route.query.modalType === "modalDiscipline") {
        this.$bvModal.show("modalDiscipline");
      }
    },
  },
};
</script>

<style>
</style>