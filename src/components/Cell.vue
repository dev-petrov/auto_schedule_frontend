<template>
  <td class="td_hover" @click="create">
    <p id="time">{{info[0]}}</p>
    <span v-for="(i,index) in info[1]" :key="index">
      <span v-if="(i.day_of_week == info[2])&&(i.lesson==info[3])">
          <p v-if="info[4]=='teacher'" ref="group">{{i.group.code}}</p>
          <p v-else-if="info[4]=='group'" ref="teacher">{{i.teacher.last_name}} {{i.teacher.first_name[0]}}.{{i.teacher.middle_name[0]}}.</p>
          <p id="discipline" class="text-truncate">{{i.discipline.title}}</p>
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
    return {
    };
  },
  computed: {
    g_t_type(){
      for(var i in this.info[1]){
        if((this.info[1][i].day_of_week == this.info[2])&&(this.info[1][i].lesson==this.info[3]))
          if(this.info[4]=='teacher')
            return this.info[1][i].group.id;
          else return this.info[1][i].teacher.id;
      }
      return 0;
    },
    lesson(){
      for(var i in this.info[1]){
        if((this.info[1][i].day_of_week == this.info[2])&&(this.info[1][i].lesson==this.info[3]))
          return this.info[1][i].discipline.id;
      }
      return '';
    },
    room(){
      for(var i in this.info[1]){
        if((this.info[1][i].day_of_week == this.info[2])&&(this.info[1][i].lesson==this.info[3]))
          return this.info[1][i].lecture_hall.id;
      }
      return '';
    },
    dow_les(){
      return [this.info[2],this.info[3]];
    },
    id(){
      return this.info[5]
    }
  },
  methods: {
    create() {
      this.$emit("create", this.g_t_type, this.lesson, this.room, this.dow_les, this.id);
    }
  }
};
</script>
