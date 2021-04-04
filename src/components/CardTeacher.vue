<template>
  <div>
    <!--<div class="container">
      <div class="input-group mb-3 mt-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Преподаватель</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="ФИО преподавателя"
          aria-label="code"
          aria-describedby="code"
          v-model="code"
        />
      </div>
    </div> -->

    <b-col v-if="this.$route.name == 'groups'">
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
    <b-col v-else-if="this.$route.name == 'teachers'">
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
              <span v-for="(day,i) in name.constraints.day_constraints" :key="i">{{days[day]}}<b>{{}}</b></span>
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
    <!-- <ModalRedact
      id="teacherModal"
      :title="
        param == 'groups'
          ? name.code
          : [name.last_name, name.first_name, name.middle_name]
      "
      :first=" param=='groups' ? name.count_of_students : name.total_hours"
      :second="name.disciplines"
      :third="param=='groups' ? name.flow.name : name.constraints"
    /> -->
  </div>
</template>
<script>
//import ModalRedact from "./ModalRedact.vue";
export default {
  //components: { ModalRedact },
  props: ["name"],
  name: "RedactCard",
  data() {
    return {
      param: this.$route.name,
      days: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
    };
  },
  watch: {
    $route() {
      this.param = this.$route.name;
      //this.showModal()
    },
  },
  mounted() {
    //this.showModal()
  },
  methods: {
    showModal() {
      var modalType = this.$route.query.modalType;
      var id = this.$route.query.id;
      if (modalType === "teacherModal" && id) {
        this.$bvModal.show(modalType);
      }
    },
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
  },
};
</script>
<style>
</style>