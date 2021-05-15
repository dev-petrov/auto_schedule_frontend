<template lang="">
    <b-modal  id="modalTrainingDirection" @ok="saveTrainingDirection" title="Направление подготовки" @hidden="closeModal()">
        <div class="d-block">
          <b-input-group size="md" :prepend="'Название'">
            <b-form-input type="text" v-model="training_direction.name"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block my-2">
          <b-input-group size="md" :prepend="'Код'">
            <b-form-input type="text" v-model="training_direction.code"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block">
        <label>Тип</label>
        <v-select
          v-model="training_direction.type"
          id="type"
          :options="types"
          placeholder="Выберите тип"
          label='label'
          value='code'
          :reduce='(v) => v.code'
        ></v-select>
      </div>
      <div>
      <label>Ограничения</label>
      <constraint-table v-model='training_direction.constraints' />
      </div>
      <div>
      <label>Ограничения по зданиям</label>
      <building-table v-model='training_direction.building_constraints' />
      </div>
    </b-modal>
</template>
<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import http from "../../http";
import ConstraintTable from "../ConstraintTable";
import BuildingTable from "../BuildingTable";

export default {
  components: {
    vSelect,
    ConstraintTable,
    BuildingTable,
  },
  data() {
    return {
      types: [
        {
          code: "B",
          label: "Бакалавриат",
        },
        {
          code: "S",
          label: "Специалитет",
        },
        {
          code: "M",
          label: "Магистратура",
        },
      ],
    };
  },
  computed: {
    training_direction() {
      return (
        this.$store.state.training_directions[
          this.$store.state.training_directions.findIndex(
            (v) => v.id == this.$route.query.id
          )
        ] || {constraints: [], building_constraints: []}
      );
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
    async saveTrainingDirection() {
      if (this.training_direction.id) {
        await http.updateItem(
          "TrainingDirection",
          this.training_direction.id,
          this.training_direction,
          true
        );
      } else {
        await http.createItem(
          "TrainingDirection",
          this.training_direction,
          true
        );
      }
      this.closeModal();
    },
  },
  async beforeMount() {
    if (this.$store.state.disciplines.length == 0) {
      await this.$store.dispatch("setDisciplines");
    }
  },
};
</script>
<style lang="">
</style>