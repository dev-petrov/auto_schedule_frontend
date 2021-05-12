<template>
  <div>
    <v-select
      multiple
      v-model="training_directions"
      id="disciplines"
      :options="$store.state.training_directions"
      placeholder="Выберите направления подготовки"
      :getOptionLabel='(o) => `${o.name} ${o.code}`'
      :reduce="(v) => v.id"
      value="id"
    ></v-select>
    <b-button
      @click="$bvModal.show('modalGroup')"
      block
      variant="primary"
      class="mt-2"
      >Добавить</b-button
    >
    <b-table :items="group" :fields="fields">
      <template #cell(edit)="row">
        <b-button
          class="btn btn-primary"
          @click="
            $router.replace({
              name: $route.name,
              query: {
                ...$route.query,
                id: row.item.id,
                modalType: 'modalGroup',
              },
            })
          "
        >
          Редактировать
        </b-button>
      </template>
    </b-table>
    <ModalGroup />
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import ModalGroup from "./modals/ModalGroup.vue";
export default {
  components: { ModalGroup, vSelect },
  data() {
    return {
      fields: [
        {
          key: "code",
          label: "Группа",
          formatter: (value) => {
            return value
          },
        },
        {
          key: "count_of_students",
          label: "Размер",
          formatter: (value) => {
            return value
          },
        },
        {
          key: "flow",
          label: "Направление",
          formatter: (value) => {
              return value.name
          }
        },
        {
          key: "disciplines",
          label: "Дисциплины",
          formatter: (value) => {
              let arr = []
              for (var i in value){
                  arr.push(value[i].title)
              }
              return arr.toString().replace("[", "").replace("]", "")
          }
        },
        {
          key: "edit",
          label: "",
        },
      ],
      training_directions: [],
    };
  },
  async beforeMount() {
    if (this.$store.state.groups.length == 0) {
      await this.$store.dispatch("setGroups");
    }
    if (this.$store.state.training_directions.length == 0) {
      await this.$store.dispatch("setTrainingDirections");
    }
    if (this.$route.query.modalType === "modalGroup") {
      this.$bvModal.show("modalGroup");
    }
  },
  computed: {
    group() {
      return this.$store.state.groups.filter((v) =>
        this.training_directions.length != 0 ? this.training_directions.includes(v.training_direction.id) : true
      );
    },
  },
  watch: {
    $route() {
      if (this.$route.query.modalType === "modalGroup") {
        this.$bvModal.show("modalGroup");
      }
    },
  },
};
</script>

<style>
</style>