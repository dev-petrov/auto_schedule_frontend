<template lang="">
    <b-modal  id="modalDelete" @ok="deleteEducationPlan" :title="'Вы уверены?'" @hidden="closeModal()">
    
    </b-modal>
</template>
<script>
import "vue-select/dist/vue-select.css";
import http from "../../http";


export default {
  components: {
  },
  data() {
    return {
      disciplines: [],
    };
  },
  computed: {
    education_plan() {
      return (
        this.$store.state.education_plans
        //  this.$store.state.education_plans.findIndex(
        //    (v) => v.id == this.$route.query.id
        //  )
        //] || {}
      );
    },
  },
  watch: {
    $route() {
      
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
    async deleteEducationPlan() {
      if (this.education_plan) {
        var id = this.$store.state.education_plans.findIndex(
            (v) => v.id == this.$route.query.id
          ) 
        this.education_plan.splice(id,1)
        await http.deleteItem("EducationPlan", this.$route.query.id, true);
        this.$store.commit("setEducationPlans", this.education_plan)
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