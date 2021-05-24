<template>
  <b-modal
    id="modalFlow"
    @ok="saveFlow"
    :title="flow.name || 'Добавить дисциплину'"
    @hidden="closeModal()"
  >
    <div class="d-block my-2">
      <b-input-group size="md" :prepend="'Название'">
        <b-form-input v-model="flow.name"></b-form-input>
      </b-input-group>
    </div>
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
    };
  },
  computed: {
    flow() {
      return this.$store.state.flows[
        this.$store.state.flows.findIndex(
          (v) => v.id == this.$route.query.id
        )
      ]
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
    async saveFlow() {
      if (this.flow.id) {
        await http.updateItem(
          "Flow",
          this.flow.id,
          this.flow,
          true
        );
      } else {
        await http.createItem("Discipline", this.flow, true);
      }
      this.closeModal();
    },
  },
};
</script>
<style lang="">
</style>