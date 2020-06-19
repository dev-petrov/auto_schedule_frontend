<template>
  <td class="td_hover" @click="create">
    <p id="time">{{info[0]}}</p>
    <span v-for="(i,index) in info[1]" :key="index">
      <span v-if="(i.day_of_week == info[2])&&(i.lesson==info[3])">
          <p v-if="info[4]=='teacher'" id="group">{{i.group.code}}</p>
          <p v-else-if="info[4]=='group'">{{i.teacher.last_name}} {{i.teacher.first_name[0]}}.{{i.teacher.middle_name[0]}}.</p>
          <p id="discipline" class="text-truncate">{{i.discipline.discipline.title}}</p>
          <span v-if="(i.lecture_hall.building == 'E')">
            <p style="color: darkblue" id="lecture_hall"><b>{{i.lecture_hall.code}}</b></p>
          </span>
          <span v-if="(i.lecture_hall.building == 'A')">
            <p style="color: darkgreen" id="lecture_hall"><b>{{i.lecture_hall.code}}</b></p>
          </span>
          <span v-if="(i.lecture_hall.building == 'V')">
            <p style="color: orangered" id="lecture_hall"><b>{{i.lecture_hall.code}}</b></p>
          </span>
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
