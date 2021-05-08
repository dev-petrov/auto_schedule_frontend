<template lang="">
    <b-modal id="modalGroup" @ok="saveGroup" :title="name.code || 'Добавить группу'" @hidden="closeModal()">
      <div class="d-block">
        <div v-if='name.id'>
          <h5>Направление подготовки</h5>
          <p>{{name.training_direction.name}}</p>
        </div>
        
      <v-select
      v-else
          v-model="name.training_direction"
          id="training_direction"
          :options="$store.state.training_directions"
          placeholder="Выберите направление подготовки"
          label='name'
          value='id'
      ></v-select>
        </div>
        <div class="d-block my-2">
          <b-input-group size="md" :prepend="'Размер'">
            <b-form-input type="number" :value="name.count_of_students"></b-form-input>
          </b-input-group>
        </div>
        <b-table bordered v-if='name.id' small striped hover :items="this.name.disciplines || []" :fields="[{key: 'title', label: 'Дисциплины группы из образовательного плана'}]"></b-table>
        <!-- <v-select
          multiple
          v-model="disciplines"
          id="disciplines"
          :options="$store.state.disciplines"
          placeholder="Выберите дисциплину"
          label='title'
          value='id'
        ></v-select> -->
        <p>Ограничения из направления подготовки</p>
        <constraint-table v-model='name.training_direction.constraints' :readonly='true'/>
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
    name() {
      return (
        this.$store.state.groups[
          this.$store.state.groups.findIndex(
            (v) => v.id == this.$route.query.id
          )
        ] || { training_direction: {} }
      );
    },
  },
  watch: {
    $route() {
      this.disciplines = this.name.disciplines || [];
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
    async saveGroup() {
      if (this.name.id) {
        this.name.disciplines = this.disciplines;
        this.name.flow_id = this.name.flow.id;
        this.name.training_direction_id = this.name.training_direction.id;
        await http.updateItem("Group", this.name.id, this.name, true);
      }
      this.closeModal();
    },
  },
  async beforeMount() {
    if (this.$store.state.disciplines.length == 0) {
      await this.$store.dispatch("setDisciplines");
    }
    if (this.$store.state.training_directions.length == 0) {
      await this.$store.dispatch("setTrainingDirections");
    }
    this.disciplines = this.name.disciplines || [];
  },
};
</script>
<style lang="">
</style>