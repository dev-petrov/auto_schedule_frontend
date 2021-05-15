<template lang="">
    <b-modal id="modalGroup" @ok="saveGroup" :title="group.code || 'Добавить группу'" @hidden="closeModal()">
      <div class="d-block">
        <div v-if='group.id'>
          <h5>Направление подготовки</h5>
          <p>{{group.training_direction.name}}</p>
        </div>
        <div v-else>
          <div class="d-block my-2">
          <b-input-group size="md" :prepend="'Код'">
            <b-form-input v-model="group.code"></b-form-input>
          </b-input-group>
        </div>
           <v-select
      
          v-model="group.training_direction"
          id="training_direction"
          :options="$store.state.training_directions"
          placeholder="Выберите направление подготовки"
          label='name'
          value='id'
      ></v-select>
          </div>
       
        </div>
         <v-select
      
          v-model="group.flow"
          id="flow"
          :options="$store.state.flows"
          placeholder="Выберите поток (необязательно)"
          label='name'
          value='id'
          class='my-2'
      ></v-select>
        <div class="d-block my-2">
          <b-input-group size="md" :prepend="'Размер'">
            <b-form-input type="number" v-model="group.count_of_students"></b-form-input>
          </b-input-group>
        </div>
        <b-table bordered v-if='group.id' small striped hover :items="this.group.disciplines || []" :fields="[{key: 'title', label: 'Дисциплины группы из образовательного плана'}]"></b-table>
        <div v-if='group.training_direction'>
        <p>Ограничения из направления подготовки</p>
        <constraint-table v-model='group.training_direction.constraints' :readonly='true'/>
        </div>
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
    group() {
      return (
        this.$store.state.groups[
          this.$store.state.groups.findIndex(
            (v) => v.id == this.$route.query.id
          )
        ] || {}
      );
    },
  },
  watch: {
    $route() {
      this.disciplines = this.group.disciplines || [];
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
      if (this.group.id) {
        this.group.training_direction_id = this.group.training_direction.id;
        this.group.flow_id = this.group.flow.id;
        await http.updateItem("Group", this.group.id, this.group, true);
      } else {
        this.group.training_direction_id = this.group.training_direction.id;
        this.group.flow_id = this.group.flow ? this.group.flow.id : null;
        await http.createItem("Group", this.group, true);
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
    if (this.$store.state.flows.length == 0) {
      await this.$store.dispatch("setFlows");
    }
    this.disciplines = this.group.disciplines || [];
  },
};
</script>
<style lang="">
</style>