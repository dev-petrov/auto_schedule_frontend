<template>
    <b-col>
      <b-card
        :title="name.code"
        tag="article"
        style="max-width: 21rem"
        class="mb-2"
      >
        <b-card-body>
          <b-card-text class="text-left">
            <p>
              Направление: <b>{{ name.flow.name }}</b>
            </p>
            <p>
              Размер: <b>{{ name.count_of_students }}</b>
            </p>
            <p>
              Дисциплины: <br /><b
                v-for="discipline in name.disciplines"
                :key="discipline.id"
                >{{ discipline.title }}<br
              /></b>
            </p>
          </b-card-text>
        </b-card-body>
        <template #footer>
          <b-button href="#" variant="primary" @click="setModal(name.id)"
            >Редактировать</b-button
          >
        </template>
      </b-card>
    </b-col>
</template>
<script>
export default {
  props: ["name"],
  name: "CardGroup",
  data() {
    return {
      param: this.$route.name,
    };
  },
  watch: {
    $route() {
      this.param = this.$route.name;
    },
  },
    methods:{
    setModal(id) {
      this.$router.replace({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          id: id,
          modalType: "groupModal",
        },
      });
    },
  }
};
</script>
<style lang="">
</style>