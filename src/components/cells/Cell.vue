<template>
  <td
    class="td_hover tbody_tr_td text-center"
    @click="create"
    :style="`background: ${lesson.lecture_hall.building.primary_color}; color: ${lesson.lecture_hall.building.secondary_color};font-size: 11px`"
  >
    <p v-if="type == 'teacher'" id="group">{{ lesson.group.code }}</p>
    <p class='text-truncate' v-else-if="type == 'group' && lesson.teacher.last_name !== ''" v-b-tooltip.hover
      :title=" `${lesson.teacher.last_name} ${lesson.teacher.first_name} ${lesson.teacher.middle_name}`">
      {{ lesson.teacher.last_name }}
    </p>
    <p
      id="discipline"
      class="text-truncate"
      v-b-tooltip.hover
      :title="lesson.discipline.title"
    >
      {{ lesson.discipline.short_name }}
    </p>
    <p id="lecture_hall">
      <b>{{ lesson.lecture_hall.code }}</b>
    </p>
  </td>
</template>
<script>
export default {
  name: "cell",
  props: ["schedule", "type", "person_id", "day", "lesson_num"],
  data() {
    return {};
  },
  computed: {
    lesson() {
      var lesson = {
        id: null,
        lecture_hall: {
          building: {
            primary_color: "#FFFFFF",
            secondary_color: "#000000",
          },
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
          short_name: "НД",
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
        lesson.lecture_hall.building = this.$store.state.buildings[
          this.$store.state.buildings.findIndex(
            (v) => v.id == lesson.lecture_hall.building_id
          )
        ];
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
<style>
p {
  margin: 0;
}
</style>