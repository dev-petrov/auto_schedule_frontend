<template>
  <td class="td_hover" @click="create">
    <p id="time">{{info[0]}}</p>
    <span v-for="(i,index) in info[1]" :key="index">
      <span v-if="(i.day_of_week == info[2])&&(i.lesson==info[3])">
          <p id="group">{{i.group.code}}</p>
          <p id="discipline" class="text-truncate">{{i.discipline.discipline.title}}</p>
          <p id="lecture_hall">{{i.lecture_hall.code}}</p>
      </span>
    </span>
  </td>
</template>
<script>
export default {
  name: "cell",
  props: ["info"],
  data() {
    return {};
  },
  methods: {
    create() {
      this.$emit("createCard");
    }
  }
};
</script>
