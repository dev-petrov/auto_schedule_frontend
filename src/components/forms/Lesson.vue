<template>
  <div class="card" style='min-width: 300px'>
    <div class="card-header">
      <button class="btn btn-secondary mr-1" v-if="lesson.id" @click="del">
        Удалить
      </button>
      <span v-if="seen">Все поля должны быть заполнены</span>
      <button class="close ml-1" id="btn-close" @click="remove">
        <span style="font-size: 20px !important">×</span>
      </button>
    </div>
    <div class="card-body">
      <v-select
        v-if="dtype == 'group'"
        id="opt-group"
        ref="optGroup"
        class="my-2"
        v-model="lesson.teacher_id"
        :options="$store.state.teachers"
        :reduce="(teacher) => teacher.id"
        placeholder="Выберите преподавателя"
        :getOptionLabel="(option) => option.last_name + ' ' + option.first_name"
      >
      </v-select>

      <v-select
        id="opt-group"
        ref="optGroup"
        v-else
        class="my-2"
        v-model="lesson.group_id"
        :options="$store.state.groups"
        :reduce="(group) => group.id"
        placeholder="Выберите группу"
        :getOptionLabel="(option) => option.code"
      >
      </v-select>
      <v-select
        id="opt-group"
        ref="optGroup"
        class="my-2"
        v-model="lesson.discipline_id"
        :options="disciplines"
        :reduce="(discipline) => discipline.id"
        placeholder="Выберите дисциплину"
        :getOptionLabel="(option) => option.title"
      >
      </v-select>
       <v-select
        id="opt-group"
        ref="optGroup"
        class="my-2"
        v-model="lesson.lecture_hall_id"
        :options="$store.state.lecture_halls"
        :reduce="(lecture_hall) => lecture_hall.id"
        placeholder="Выберите аудиторию"
        :getOptionLabel="(option) => option.code"
      >
      </v-select>
      <button class="btn btn-block btn-primary" type="submit" @click="submit">
        Сохранить
      </button>
    </div>
  </div>
</template>
<script>
import "bootstrap";
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

export default {
  props: ["lesson"],
  data() {
    return {
      seen: false,
    };
  },
  components: {
    vSelect,
  },
  computed: {
    disciplines() {
      // TODO сделать пересечение дисциплин
      let persons =
        this.dtype == "teacher"
          ? this.$store.state.groups
          : this.$store.state.teachers;
      let person_id =
        this.dtype == "teacher" ? this.lesson.group_id : this.lesson.teacher_id;
      return (
        persons[persons.findIndex((v) => v.id == person_id)]?.disciplines || []
      );
    },
    dtype() {
      return this.$route.query.dtype;
    },
    teachers() {
      let choices = [];

      for (let t of this.$store.state.teachers) {
        choices.push({
          id: t.id,
          name: `${t.last_name} ${t.first_name[0]}.${
            t.middle_name ? t.middle_name[0] + "." : ""
          }`,
        });
      }

      return choices;
    },
    groups() {
      let choices = [];
      for (let g of this.$store.state.groups) {
        choices.push({
          id: g.id,
          name: g.code + " (" + g.count_of_students + ")",
        });
      }
      return choices;
    },
  },
  methods: {
    remove() {
      this.$emit("removeCard");
      this.seen = false;
    },
    async del() {
      await this.$store.dispatch("deleteLesson", this.lesson);
      this.remove();
    },
    async submit() {
      if (this.lesson.id) {
        await this.$store.dispatch("updateLesson", this.lesson);
      } else {
        await this.$store.dispatch("createLesson", this.lesson);
      }
      this.remove();
    },
  },
};
</script>
<style>
* {
  font-size: 12px;
}
</style>