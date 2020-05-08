<template>
  <div>
    <div class="d-flex mb-3" id="table">
      <table class="table table-bordered">
        <thead class="thead">
          <tr>
            <th scope="col">ФИО</th>
          </tr>
        </thead>
        <tbody class="tbody">
          <tr v-for="name in names" :key="name.id">
            <th scope="row"><p>{{ name.first_name }}<br>{{name.last_name}}<br>{{name.middle_name}}</p></th>
          </tr>
        </tbody>
      </table>
      <div class="div_flow">
        <table class="table table-bordered">
          <thead class="thead">
            <tr>
              <th scope="col" colspan="7">ПН</th>
              <th scope="col" colspan="7">ВТ</th>
              <th scope="col" colspan="7">СР</th>
              <th scope="col" colspan="7">ЧТ</th>
              <th scope="col" colspan="7">ПТ</th>
              <th scope="col" colspan="7">СБ</th>
            </tr>
          </thead>
          <tbody class="tbody">
            <tr v-for="name in names" :key="name.id">
              <cell v-for="(time,index) in times" :key="index" :info="[time, shedule[name.id], 1]" @createCard="create" />
              <cell v-for="(time,index) in times" :key="index" :info="[time, shedule[name.id], 2]" @createCard="create" />
              <cell v-for="(time,index) in times" :key="index" :info="[time, shedule[name.id], 3]" @createCard="create" />
              <cell v-for="(time,index) in times" :key="index" :info="[time, shedule[name.id], 4]" @createCard="create" />
              <cell v-for="(time,index) in times" :key="index" :info="[time, shedule[name.id], 5]" @createCard="create" />
              <cell v-for="(time,index) in times" :key="index" :info="[time, shedule[name.id], 6]" @createCard="create" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <FormLesson @removeCard="remove" class="card" id="inputCard" ref="inputCard" :class="[seen ? '' : 'd-none']" style="position: absolute;"
        :style="{left: left + 'px', top: top + 'px' }" ></FormLesson>
    <FormRoom class="card d-none" style="position: absolute;"></FormRoom>
    <Plan class="card d-none" style="position: absolute;"></Plan>  
    <Group class="card d-none" style="position: absolute;"></Group>
    <Flow class="card d-none" style="position:absolute;"></Flow>
    <Direction class="card d-none" style="position:absolute;"></Direction>
    <Discipline class="card d-none" style="position:absolute;"></Discipline>
    <Teacher class="card d-none" style="position:absolute;"></Teacher>
  </div>
</template>
<script>
import Cell from "./Cell";
import FormLesson from "./forms/Lesson";
import FormRoom from "./forms/Room";
import Plan from "./forms/Plan";
import Group from "./forms/Group";
import Flow from "./forms/Flow";
import Direction from "./forms/Diretion";
import Discipline from "./forms/Discipline";
import Teacher from "./forms/Teacher"
export default {
  components: {
    Cell,
    FormLesson,
    FormRoom,
    Plan,
    Group,
    Flow,
    Direction,
    Discipline,
    Teacher
  },
  data() {
    return {
      names: [
                {
                    "id": "1",
                    "first_name": "Иван",
                    "last_name": "Иванов",
                    "middle_name": "Иванович",
                    "disciplines": ["DM","MA"]
                },
                {
                    "id": "2",
                    "first_name": "Петро",
                    "last_name": "Иванов",
                    "middle_name": "Иванович",
                    "disciplines": ["ENG","RU"]
                }
              ],
      groups:[
        {
          "id":"1",
          "code":"181-351",
          "training_direction":"IS"
        },
        {
          "id":"2",
          "code":"181-352",
          "training_direction":"IB"
        }
      ],
      shedule:{ 
        "1":[{"discipline":"MA","lecture_hall":"Н303","building":"ЭЗ","group":"181-351","time":"9:00-10:30", "day_of_week":1},{"discipline":"DM","lecture_hall":"В504","building":"ЭЗ","group":"181-351","time":"16:10-17:40", "day_of_week":1}],
        "2":[{"discipline":"Eng","lecture_hall":"ПК517","building":"ПК","group":"181-352","time":"10:40-12:10", "day_of_week":2}],
      },
      times: [
        "9:00-10:30",
        "10:40-12:10",
        "12:20-13:50",
        "14:30-16:00",
        "16:10-17:40",
        "17:50-19:20",
        "19:30-21:00"
      ],
      toSend:{
        "group":'',
        "discipline":'',
        "class":''
      },
      width:0,
      seen: false,
      left: 0,
      top: 0
    };
  },
  methods: {
    create() {
      if(this.width==0)
        this.width = this.matchWidth();
      this.left = event.clientX;
      this.top = event.clientY;
      this.seen=true;
    },
    matchWidth(){
      return this.$refs.inputCard.clientWidth;
    },
    remove(){
      this.seen=false;
    },
    submit(){
      this.toSend.group = this.$refs.optGroup.value;
      this.toSend.discipline = this.$refs.optDiscipline.value;
      console.log(this.toSend.group, this.toSend.discipline);
    }
  }
};
</script>
<style>
.div_flow {
  overflow-x: auto;
  white-space: nowrap;
}

.td_hover:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

.table {
  margin: 0;
}

tbody > tr {
  height: 190px !important;
}
.temp {
  width: 130px;
}
</style>