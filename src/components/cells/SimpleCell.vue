<template>
  <tr :class="{ 'd-none': !active }">
    <td class="p-2">
      <p id="time">{{ time }}</p>
      <span v-if="active">
        <p>
          {{ lesson.teacher.last_name }} {{ lesson.teacher.first_name[0] }}.{{
            lesson.teacher.middle_name[0]
          }}.
        </p>
        <p id="discipline" class="text-truncate">
          {{ lesson.discipline.title }}
        </p>
        <p
          :style="`color: ${
            $store.state.buildings[
              $store.state.buildings.findIndex(
                (v) => v.id == lesson.lecture_hall.building_id
              )
            ].primary_color
          };`"
          id="lecture_hall"
        >
          <b>{{ lesson.lecture_hall.code }}</b>
        </p>
      </span>
    </td>
  </tr>
</template>
<script>
import defaults_ru from "../../data/defaults_ru";
export default {
  name: "cell",
  props: ["lesson", "time"],
  data() {
    return {
      colors: defaults_ru.colors,
    };
  },
  computed: {
    active: function () {
      return Boolean(this.lesson);
    },
  },
};
</script>
