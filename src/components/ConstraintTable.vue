<template>
  <div>
    <table class="text-center w-100">
      <tr>
        <td>*</td>
        <td v-for="(t, l) in times" :key="`00${l * 2}`">
          {{ t }}
        </td>
      </tr>
      <tr v-for="i in 6" :key="i">
        <td>{{ days_of_week[i - 1] }}</td>
        <td
          :class="readonly ? '' : 'pointer'"
          @click="setCell(i, j)"
          @mouseenter="$event.ctrlKey ? setCell(i, j) : null"
          :style="`background: ${
            constraints[i][j] && !constraints[i][j].remove
              ? '#e31912'
              : '#17db09'
          }`"
          v-for="j in 7"
          :key="`${i}${j}`"
        >
          {{ constraints[i][j] && !constraints[i][j].remove ? "-" : "+" }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["value", "readonly"],
  data() {
    return {
      content: this.value,
      times: ["09:00", "10:40", "12:20", "14:30", "16:10", "17:50", "19:30"],
      days_of_week: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
    };
  },
  computed: {
    constraints() {
      var constraints = {
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
      };
      for (let constraint of this.content) {
        constraints[String(constraint.day_of_week)][
          String(constraint.lesson)
        ] = constraint;
      }
      return constraints;
    },
  },
  methods: {
    setCell(i, j) {
      if (this.readonly) {
        return;
      }
      var val = this.constraints[i][j];
      if (val) {
        val.remove = val.remove ? false : true;
      } else {
        val = {
          lesson: j,
          day_of_week: i,
          remove: false,
        };
      }
      this.$set(this.constraints[i], j, val);
      let index = this.content.findIndex(
        (v) => v.day_of_week == i && v.lesson == j
      );
      if (index >= 0) {
        this.$set(this.content, index, this.constraints[i][j]);
      } else {
        this.content.push(this.constraints[i][j]);
      }
      this.$emit("input", this.content.filter(v=> v.id || !v.remove));
    },
  },
};
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>