<template lang="">
    <b-modal  id="modalLectureHall" @ok="saveLectureHall" :title="lecture_hall.code" @hidden="closeModal()">
        <div class="d-block">
          <b-input-group size="md" :prepend="'Аудитория'">
            <b-form-input type="text" v-model="lecture_hall.code"></b-form-input>
          </b-input-group>
          <v-select
      v-model="lecture_hall.building"
      id="buildings"
      :options="$store.state.buildings"
      placeholder="Выберите строение"
      label="name"
      value="building.id"
      
      class="my-2"
    ></v-select>
          <v-select
      v-model="lecture_hall.prof_type"
      id="prof_type"
      :options="prof_types"
      placeholder="Выберите тип аудитории"
      label="name"
      value="type"
      :reduce="v => v.type"
      class="my-2"
    ></v-select>
    <div class="d-block my-2">
      <b-form-checkbox
        id="has_projector"
        v-model="lecture_hall.has_projector"
        name="has_projector"
      >
        Проектор
      </b-form-checkbox>
      <b-form-checkbox
        id="has_big_blackboard"
        v-model="lecture_hall.has_big_blackboard"
        name="has_big_blackboard"
      >
        Большая доска
      </b-form-checkbox>
    </div>
        </div>
    </b-modal>
</template>
<script>
import "vue-select/dist/vue-select.css";
import http from "../../http";
import vSelect from "vue-select";

export default {
  components: {    vSelect,},
  data() {
    return {
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
    lecture_hall() {
      let lecture_hall =  this.$store.state.lecture_halls[
        this.$store.state.lecture_halls.findIndex(
          (v) => v.id == this.$route.query.id
        )
      ]|| {
        constraints: {},
      };
      lecture_hall.has_projector = Boolean(lecture_hall.constraints.projector);
      lecture_hall.has_big_blackboard = Boolean(lecture_hall.constraints.big_blackboard);
      return lecture_hall;
    },
  },
  watch: {
    $route() {
      console.log(this.lecture_hall);
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
    async saveLectureHall() {
      if (this.lecture_hall.id) {
        await http.updateItem("LectureHall", this.lecture_hall.id, this.lecture_hall, true);
      } else {
        await http.createItem("LectureHall", this.lecture_hall, true);
      }
      this.closeModal();
    },
  },
  async beforeMount() {},
};
</script>
<style lang="">
</style>