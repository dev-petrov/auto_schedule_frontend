<template lang="">
    <b-modal id="modalEducationPlan" @ok="savePlan" title="Редактировать образовательный план" @hidden="closeModal()">
        <div class="d-block">
            <v-select
            v-model="education_plan.discipline"
            id="disciplines"
            :options="$store.state.disciplines"
            placeholder="Выберите дисциплину"
            label='title'
            value='id'
            ></v-select>
        </div>
        <div class="d-block my-2">
            <v-select
            v-model="education_plan.group"
            id="groups"
            :options="$store.state.groups"
            placeholder="Выберите группу"
            label='code'
            value='id'
            ></v-select>
        </div>
        <div class="d-block">
          <b-input-group size="md" :prepend="'Количество пар в неделю'">
            <b-form-input type="number" v-model.number="education_plan.lessons_in_week"></b-form-input>
          </b-input-group>
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
    return {};
  },
  computed: {
    education_plan() {
      return (
        this.$store.state.education_plans[
          this.$store.state.education_plans.findIndex(
            (v) => v.id == this.$route.query.id
          )
        ] || {}
      );
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
    async savePlan() {
      if (this.education_plan.id) {
        this.education_plan.discipline_id = this.education_plan.discipline.id;
        this.education_plan.group_id = this.education_plan.group.id;
        await http.updateItem(
          "EducationPlan",
          this.education_plan.id,
          this.education_plan,
          true
        );
      } else {
        this.education_plan.discipline_id = this.education_plan.discipline.id;
        this.education_plan.group_id = this.education_plan.group.id;
        await http.createItem("EducationPlan", this.education_plan, true);
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="">
</style>