<template>
  <div>
    <b-input placeholder="Название" v-model="name" />
    <b-button
      @click="$bvModal.show('modalFlow')"
      block
      variant="primary"
      class="mt-2"
      >Добавить</b-button
    >
    <b-table :items="flows" :fields="fields">
      <template #cell(edit)="row">
        <b-button
          class="btn btn-primary"
          @click="
            $router.replace({
              name: $route.name,
              query: {
                ...$route.query,
                id: row.item.id,
                modalType: 'modalFlow',
              },
            })
          "
        >
          Редактировать
        </b-button>
      </template>
    </b-table>
    <ModalFlow />
  </div>
</template>

<script>
import ModalFlow from "./modals/ModalFlow.vue";
export default {
  components: { ModalFlow },
  data() {
    return {
      fields: [
        {
          key: "name",
          label: "Название",
        },
        {
          key: "edit",
          label: "",
        },
      ],
      name: "",
    };
  },
  async beforeMount() {
      
    if (this.$store.state.flows.length == 0) {
      await this.$store.dispatch("setFlows");
    }
    if (this.$route.query.modalType === "modalFlow") {
      this.$bvModal.show("modalFlow");
    }
    console.log(this.$store.state)
  },
  computed: {
    flows() {
      return this.$store.state.flows.filter((v) =>
        this.name !== ""
          ? v.name.toLowerCase().includes(this.name.toLowerCase())
          : true
      );
    },
  },
  watch: {
    $route() {
      if (this.$route.query.modalType === "modalFlow") {
        this.$bvModal.show("modalFlow");
      }
    },
  },
};
</script>

<style>
</style>