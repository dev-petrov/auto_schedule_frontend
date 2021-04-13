<template>
  <td
    class="td_hover"
    @click="create"
    :style="`background: ${colors[lesson.lecture_hall.building][0]}; color: ${
      colors[lesson.lecture_hall.building][1]
    };`"
  >
    <span>
      <p v-if="type == 'teacher'" id="group">{{ lesson.group.code }}</p>
      <p v-else-if="type == 'group' && lesson.teacher.last_name !== ''">
        {{ lesson.teacher.last_name }} {{ lesson.teacher.first_name[0] }}.{{
          lesson.teacher.middle_name[0]
        }}.
      </p>
      <p id="discipline" class="text-truncate">{{ lesson.discipline.title }}</p>
      <p id="lecture_hall">
        <b>{{ lesson.lecture_hall.code }}</b>
      </p>
    </span>
  </td>
</template>
<script>
import defaults_ru from "../data/defaults_ru";
export default {
  name: "cell",
  props: ["schedule", "type", "person_id", "day", "lesson_num"],
  data() {
    return {
      colors: defaults_ru.colors,
    };
  },
  computed: {
    lesson() {
      var lesson = {
        id: null,
        lecture_hall: {
          building: "N",
          code: "",
        },
        group: {
          code: "",
        },
        teacher: {
          last_name: "",
          first_name: "",
          middle_name: "",
        },
        discipline: {
          title: "Нет данных",
        },
        day_of_week: this.day,
        lesson: this.lesson_num,
      };
      if (this.type == "group") {
        lesson.group_id = this.person_id;
      } else {
        lesson.teacher_id = this.person_id;
      }

      if (this.schedule) {
        lesson = this.schedule;
        lesson.discipline_id = lesson.discipline.id;
        lesson.lecture_hall_id = lesson.lecture_hall.id;
        lesson.group_id = lesson.group.id;
        lesson.teacher_id = lesson.teacher.id;
      }
      return lesson;
    },
  },
  methods: {
    create() {
      this.$emit("create", this.lesson);
    },
  },
};
</script>
