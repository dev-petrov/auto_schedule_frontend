<template>
  <div>
    <v-select
      multiple
      v-model="groups"
      id="disciplines"
      :options="$store.state.groups"
      placeholder="Выберите группы"
      label="code"
      :reduce="(v) => v.id"
      value="id"
    ></v-select>
    <b-button
      @click="$bvModal.show('modalEducationPlan')"
      block
      variant="primary"
      class="mt-2"
      >Добавить</b-button
    >
    <b-button
      @click="$bvModal.show('modalUploadEducationPlan')"
      block
      variant="primary"
      class="mt-2"
      >Загрузить</b-button
    >
    <b-table :items="education_plans" :fields="fields">
      <template #cell(edit)="row">
        <b-button
          class="btn btn-primary"
          @click="
            $router.replace({
              name: $route.name,
              query: {
                ...$route.query,
                id: row.item.id,
                modalType: 'modalEducationPlan',
              },
            })
          "
        >
          Редактировать
        </b-button>
      </template>
      <template #cell(delete)="row">
        <b-button
          class="btn btn-danger"
          @click="
            $router.replace({
              name: $route.name,
              query: {
                ...$route.query,
                id: row.item.id,
                modalType: 'modalDelete',
              },
            })
          "
        >
          Удалить
        </b-button>
      </template>
    </b-table>
    <modal-education-plan />
    <modalDelete/>
    <modal-upload-education-plans/>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import ModalEducationPlan from "./modals/ModalEducationPlan.vue";
import ModalUploadEducationPlans from "./modals/ModalUploadEducationPlans.vue";
import modalDelete from "./modals/ModalDelete.vue"
export default {
  components: { ModalEducationPlan, vSelect, modalDelete, ModalUploadEducationPlans },
  data() {
    return {
      fields: [
        {
          key: "group",
          label: "Группа",
          formatter: (value) => {
            return value.code;
          },
        },
        {
          key: "discipline",
          label: "Дисциплина",
          formatter: (value) => {
            return value.title;
          },
        },
        {
          key: "lessons_in_week",
          label: "Количество пар в неделю",
        },
        {
          key: "edit",
          label: "",
        },
        {
          key: "delete",
          label: "",
        }
      ],
      groups: [],
    };
  },
  async beforeMount() {
    if (this.$store.state.education_plans.length == 0) {
      await this.$store.dispatch("setEducationPlans");
    }
    if (this.$route.query.modalType === "modalEducationPlan") {
      this.$bvModal.show("modalEducationPlan");
    }
  },
  computed: {
    education_plans() {
      return this.$store.state.education_plans.filter((v) =>
        this.groups.length != 0 ? this.groups.includes(v.group.id) : true
      );
    },
  },
  watch: {
    $route() {
      if (this.$route.query.modalType === "modalEducationPlan") {
        this.$bvModal.show("modalEducationPlan");
      }
      else if (this.$route.query.modalType === "modalDelete"){
        this.$bvModal.show("modalDelete");
      }
    },
  },
};
</script>

<style>
</style>