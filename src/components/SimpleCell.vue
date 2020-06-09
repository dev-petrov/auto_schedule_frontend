<template>
  <tr :class="{'d-none': active}">
    <td style="">
      <p id="time">{{info[0]}}</p>
      <span v-for="(i,index) in info[1]" :key="index">
        <span v-if="(i.day_of_week == info[2])&&(i.lesson==info[3])" >
          <p>{{i.teacher.last_name}} {{i.teacher.first_name[0]}}.{{i.teacher.middle_name[0]}}.</p>
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
          <!-- info[1][2].lecture_hall.building -->
        </span>
      </span>
    </td>
  </tr>
</template>
<script>
export default {
  name: "cell",
  props: ["info"],
  data() {
    return {
      active: false,
      a: 0,
      b:'a',

    };
  },
  methods: {}
};
</script>
