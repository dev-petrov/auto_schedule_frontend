<template>
  <div class="card">
    <div class="card-header">
      <button class="btn btn-secondary mr-1" v-if="lesson.id" @click="del">Удалить</button>
      <span v-if="seen">Все поля должны быть заполнены</span>
      <button class="close ml-1" id="btn-close" @click="remove">
        <span style="font-size: 20px !important">×</span>
      </button>
    </div>
    <div class="card-body">
      <div class="input-group mb-3" v-if="dtype == 'group'">
        <!-- <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-group"
            >Преподаватели</label
          >
        </div> -->
        <select
          class="custom-select"
          id="opt-group"
          ref="optGroup"
          v-model="lesson.teacher_id"
          :required="lesson.teacher_id"
        >
          <option v-for="(i, index) in teachers" :key="index" :value="i.id">
            {{ i.name }}
          </option>
        </select>
      </div>
      <div class="input-group mb-3" v-else>
        <!-- <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-group">Группы</label>
        </div> -->
        <select
          class="custom-select"
          id="opt-group"
          ref="optGroup"
          v-model="lesson.group_id"
          :required="lesson.group_id"
        >
          <option v-for="(i, index) in groups" :key="index" :value="i.id">
            {{ i.name }}
          </option>
        </select>
      </div>
      <div class="input-group mb-3">
        <!-- <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-lesson">Предмет</label>
        </div> -->
        <select
          class="custom-select"
          id="opt-lesson"
          ref="optDiscipline"
          v-model="lesson.discipline_id"
          :required="!lesson.discipline_id"
        >
          <option
            v-for="(val, index) in disciplines"
            :key="index"
            :value="val.id"
          >
            {{ val.title }}
          </option>
        </select>
      </div>
      <div class="input-group mb-3">
        <!-- <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-room">Аудитория</label>
        </div> -->
        <select
          class="custom-select"
          id="opt-room"
          v-model="lesson.lecture_hall_id"
          :required="!lesson.lecture_hall_id"
        >
          <option
            v-for="(i, index) in $store.state.lecture_halls"
            :key="index"
            :value="i.id"
          >
            {{ i.code }} ({{ i.spaciousness }})
          </option>
        </select>
      </div>
      <button class="btn btn-block btn-primary" type="submit" @click="submit">
        Сохранить
      </button>
    </div>
  </div>
</template>
<script>
import "bootstrap";
export default {
  props: ["lesson"],
  data() {
    return {
      seen: false,
    };
  },
  computed: {
    disciplines() {
      let persons =
        this.dtype == "teacher"
          ? this.$store.state.groups
          : this.$store.state.teachers;
      let person_id = this.dtype == "teacher"
          ? this.lesson.group_id
          : this.lesson.teacher_id;
      return (
        persons[persons.findIndex((v) => v.id == person_id)]
          ?.disciplines || []
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
      await this.$store.dispatch('deleteLesson', this.lesson);
      this.remove();
    },
    async submit() {
      if (this.lesson.id) {
        await this.$store.dispatch('updateLesson', this.lesson);
      } else {
        await this.$store.dispatch('createLesson', this.lesson);
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