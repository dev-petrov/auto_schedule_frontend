<template>
  <b-modal
    id="modalDiscipline"
    @ok="saveDiscipline"
    :title="discipline.title || 'Добавить дисциплину'"
    @hidden="closeModal()"
  >
    <div class="d-block my-2">
      <b-input-group size="md" :prepend="'Название'">
        <b-form-input v-model="discipline.title"></b-form-input>
      </b-input-group>
    </div>
    <div class="d-block">
      <b-input-group size="md" :prepend="'Сокращенное название'">
        <b-form-input v-model="discipline.short_name"></b-form-input>
      </b-input-group>
    </div>
    <v-select
      v-model="discipline.prof_type"
      id="prof_type"
      :options="prof_types"
      placeholder="Выберите тип аудитории"
      label="name"
      value="type"
      :reduce="v => v.type"
      class="my-2"
    ></v-select>
    <v-select
      v-model="discipline.type"
      id="type"
      :options="types"
      placeholder="Выберите тип дисциплины"
      label="name"
      :reduce="v => v.type"
      value="type"
    ></v-select>
    <div class="d-block my-2">
      <b-form-checkbox
        id="need_projector"
        v-model="discipline.need_projector"
        name="need_projector"
      >
        Нужен проектор
      </b-form-checkbox>
      <b-form-checkbox
        id="need_big_blackboard"
        v-model="discipline.need_big_blackboard"
        name="need_big_blackboard"
      >
        Нужна большая доска
      </b-form-checkbox>
    </div>
  </b-modal>
</template>
<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import http from "../../http";

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      types: [
        {
          name: "Лекция",
          type: "L",
        },
        {
          name: "Практика",
          type: "P",
        },
        {
          name: "Лаб. работа",
          type: "LB",
        },
      ],
      prof_types: [
        {
          name: "Обычная",
          type: "S",
        },
        {
          name: "Компьютерная",
          type: "C",
        },
        {
          name: "Дизайн",
          type: "D",
        },
        {
          name: "Лаборатория",
          type: "L",
        },
        {
          name: "Мастерская",
          type: "M",
        },
      ],
    };
  },
  computed: {
    discipline() {
      let discipline = this.$store.state.disciplines[
        this.$store.state.disciplines.findIndex(
          (v) => v.id == this.$route.query.id
        )
      ] || {
        constraints: {},
      };
      discipline.need_projector = Boolean(discipline.constraints.projector);
      discipline.need_big_blackboard = Boolean(discipline.constraints.big_blackboard);
      return discipline;
    },
  },
  watch: {
    $route() {},
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
    async saveDiscipline() {
      if (this.discipline.id) {
        await http.updateItem(
          "Discipline",
          this.discipline.id,
          this.discipline,
          true
        );
      } else {
        await http.createItem("Discipline", this.discipline, true);
      }
      this.closeModal();
    },
  },
};
</script>
<style lang="">
</style>