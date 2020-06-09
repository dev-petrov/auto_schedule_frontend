<template>
  <tr :class="{'d-none': active}">
    <td style="">
      <p id="time">{{info[0]}}</p>
      <span v-for="(i,index) in info[1]" :key="index">
        <span v-if="(i.day_of_week == info[2])&&(i.lesson==info[3])" >
          <p>{{i.teacher.last_name}} {{i.teacher.first_name[0]}}.{{i.teacher.middle_name[0]}}.</p>
          <p id="discipline" class="text-truncate">{{i.discipline.discipline.title}}</p>
          <p id="lecture_hall">{{i.lecture_hall.code}}</p>
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
      a: 0,
      b:'a',
      data: false,
    };
  },
  computed:{
    
    active: function(){
      for(var i in this.info[1]){
        console.log(i);
        console.log(this.info[1][i]);
        if((this.info[1][i].day_of_week == this.info[2])&&(this.info[1][i].lesson==this.info[3])) 
            return false;
      }
      return true;
    }
  },
  methods: {}
};
</script>
