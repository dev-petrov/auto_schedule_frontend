<template>
  <tr :class="{'d-none': active}">
    <td class="p-2">
      <p id="time">{{info[0]}}</p>
      <span v-for="(i,index) in info[1]" :key="index">
        <span v-if="(i.day_of_week == info[2])&&(i.lesson==info[3])">
          <p>{{i.teacher.last_name}} {{i.teacher.first_name[0]}}.{{i.teacher.middle_name[0]}}.</p>
          <p id="discipline" class="text-truncate">{{i.discipline.title}}</p>
          <p v-if="(i.lecture_hall.building == 'E')" style="color: darkblue" id="lecture_hall">
            <b>{{i.lecture_hall.code}}</b>
          </p>
          <p v-if="(i.lecture_hall.building == 'A')" style="color: darkgreen" id="lecture_hall">
            <b>{{i.lecture_hall.code}}</b>  
          </p>
          <p v-if="(i.lecture_hall.building == 'V')" style="color: orangered" id="lecture_hall">
            <b>{{i.lecture_hall.code}}</b>
          </p>
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
      data: false,
      tmp: []
    };
  },
  computed: {
    active: function() {
      for (var i in this.info[1]) {
        if (
          this.info[1][i].day_of_week == this.info[2] &&
          this.info[1][i].lesson == this.info[3]
        ) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {}
};
</script>
