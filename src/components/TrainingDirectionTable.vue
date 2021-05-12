<template>
  <div>
    <b-input placeholder="Название" v-model="name"/>
    <b-button
      @click="$bvModal.show('modalTrainingDirection')"
      block
      variant="primary"
      class="mt-2"
      >Добавить</b-button
    >
    <b-table :items="training_directions" :fields="fields">
      <template #cell(edit)="row">
        <b-button
          class="btn btn-primary"
          @click="
            $router.replace({
              name: $route.name,
              query: {
                ...$route.query,
                id: row.item.id,
                modalType: 'modalTrainingDirection',
              },
            })
          "
        >
          Редактировать
        </b-button>
      </template>
    </b-table>
    <modal-training-direction />
  </div>
</template>

<script>
import ModalTrainingDirection from "./modals/ModalTrainingDirection.vue";
export default {
  components: { ModalTrainingDirection },
  data() {
    return {
      fields: [
        {
          key: "code",
          label: "Код",
        },
        {
          key: "name",
          label: "Название",
        },
        {
          key: "edit",
          label: "",
        },
      ],
      name: '',
    };
  },
  async beforeMount() {
    if (this.$store.state.training_directions.length == 0) {
      await this.$store.dispatch("setTrainingDirections");
    }
    if (this.$route.query.modalType === "modalTrainingDirection") {
      this.$bvModal.show("modalTrainingDirection");
    }
  },
  computed: {
    training_directions() {
      return this.$store.state.training_directions.filter((v) =>
        this.name !== '' ? v.name.toLowerCase().includes(this.name.toLowerCase()) : true
      );
    },
  },
  watch: {
    $route() {
      if (this.$route.query.modalType === "modalTrainingDirection") {
        this.$bvModal.show("modalTrainingDirection");
      }
    },
  },
};
</script>

<style>
</style>