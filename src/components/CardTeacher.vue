<template>
  <b-col>
    <b-card
      :title="
        name.last_name +
        ' ' +
        name.first_name[0] +
        '.' +
        name.middle_name[0] +
        '.'
      "
      img-src="https://st4.depositphotos.com/1064024/20942/i/600/depositphotos_209420380-stock-photo-digital-illustration-little-cute-unicorn.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 21rem"
      class="mb-2"
    >
      <b-card-body>
        <b-card-text class="text-left">
          <p>
            Дисциплины: <br /><b
              v-for="discipline in name.disciplines"
              :key="discipline.id"
              >{{ discipline.title }}<br
            /></b>
          </p>
          <p>
            Количество часов: <b>{{ name.total_hours }}</b>
          </p>
          <p>
            Предпочтения: <br />Корпуса:<b>{{
              name.constraints.buildings_priority
            }}</b
            ><br />Дни:
            <span v-for="(day, i) in name.constraints.day_constraints" :key="i"
              >{{ days[day] }}<b>{{}}</b></span
            >
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
  name: "CardTeacher",
  data() {
    return {
      param: this.$route.name,
      days: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
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
          modalType: "teacherModal",
        },
      });
    },
  }
};
</script>
<style>
</style>