<template>
  <div>
    <div class="container">
      <div class="input-group mb-3 mt-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="code">Группа</span>
        </div>
        <input
          type="text"
          class="form-control"
          placeholder="code"
          aria-label="code"
          aria-describedby="code"
          v-model="code"
        />
      </div>
      <div class="d-flex" v-if="!this.$route.params.type">
        <p>
          <a
            v-for="name in names"
            :key="name.id"
            class="mr-1 link"
            @click="code=name.code;display()"
          >{{name.code}}</a>
        </p>
      </div>
    </div>
    <div class="layer" scrolling="auto" v-if="this.$route.params.type"> <!-- таблицы редактирования-->
      <tr class="d-flex mb-3" id="table">
        <td>
          <table class="table table-bordered">
            <thead class="thead">
              <tr>
                <th scope="col">Именование</th>
              </tr>
            </thead>
            <tbody class="tbody">
              <tr v-for="name in names" :key="name.id">
                <th scope="row">
                  <p>
                    {{name.code}}{{ name.last_name }}
                    <br />
                    {{name.first_name}}
                    <br />
                    {{name.middle_name}}
                  </p>
                </th>
              </tr>
            </tbody>
          </table>
        </td>
        <td class="div_flow">
          <table class="table table-bordered">
            <thead class="thead">
              <tr>
                <th scope="col" colspan="7" v-for="day in days" :key="day.id">
                  <span v-if="day==1">ПН</span>
                  <span v-else-if="day==2">ВТ</span>
                  <span v-else-if="day==3">СР</span>
                  <span v-else-if="day==4">ЧТ</span>
                  <span v-else-if="day==5">ПТ</span>
                  <span v-else-if="day==6">СБ</span>
                </th>
              </tr>
            </thead>
            <tbody class="tbody">
              <tr v-for="name in names" :key="name.id">
                <cell
                  v-for="(time,index) in times"
                  :key="index"
                  :info="[time, shedule[name.id], 1, index+1,type]"
                  @createCard="create"
                />
                <cell
                  v-for="(time,index) in times"
                  :key="index"
                  :info="[time, shedule[name.id], 2, index+1,type]"
                  @createCard="create"
                />
                <cell
                  v-for="(time,index) in times"
                  :key="index"
                  :info="[time, shedule[name.id], 3, index+1,type]"
                  @createCard="create"
                />
                <cell
                  v-for="(time,index) in times"
                  :key="index"
                  :info="[time, shedule[name.id], 4, index+1,type]"
                  @createCard="create"
                />
                <cell
                  v-for="(time,index) in times"
                  :key="index"
                  :info="[time, shedule[name.id], 5, index+1,type]"
                  @createCard="create"
                />
                <cell
                  v-for="(time,index) in times"
                  :key="index"
                  :info="[time, shedule[name.id], 6, index+1,type]"
                  @createCard="create"
                />
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </div>
    <!-- Пиши ниже -->
    <div class="" v-else-if="shedule"> <!-- Окно расписания -->
    <table  style>
      <tr>
        <td v-for="day in days" :key="day.id" >
          <table class="table table-bordered col">
            <thead class="thead">
              <th scope="col" v-if="day==1">ПН</th>
              <th scope="col" v-else-if="day==2">ВТ</th>
              <th scope="col" v-else-if="day==3">СР</th>
              <th scope="col" v-else-if="day==4">ЧТ</th>
              <th scope="col" v-else-if="day==5">ПТ</th>
              <th scope="col" v-else-if="day==6">СБ</th>
            </thead>
            <tbody>
              <SimpleCell
                v-for="(time,index) in times"
                :key="index"
                :info="[time, shedule, day, index+1]"
              ></SimpleCell>
            </tbody>
          </table>
        </td>
      </tr>
    </table>
    </div>
    <FormLesson
      :info="[toSend, shedule]"
      @removeCard="remove"
      class="card"
      id="inputCard"
      ref="inputCard"
      :class="[seen ? '' : 'd-none']"
      style="position: absolute;"
      :style="{left: left + 'px', top: top + 'px' }"
    ></FormLesson>
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
import SimpleCell from "./SimpleCell";
import FormLesson from "./forms/Lesson";
import FormRoom from "./forms/Room";
import Plan from "./forms/Plan";
import Group from "./forms/Group";
import Flow from "./forms/Flow";
import Direction from "./forms/Diretion";
import Discipline from "./forms/Discipline";
import Teacher from "./forms/Teacher";
import Axios from "axios";
import auth from "../auth";
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
    Teacher,
    SimpleCell
  },
  data() {
    return {
      type: "",
      code: "",
      auth: auth,
      names: [],
      groups: [
        {
          id: "1",
          code: "181-351",
          training_direction: "IS"
        },
        {
          id: "2",
          code: "181-352",
          training_direction: "IB"
        }
      ],
      shedule: false,
      times: [
        "9:00-10:30",
        "10:40-12:10",
        "12:20-13:50",
        "14:30-16:00",
        "16:10-17:40",
        "17:50-19:20",
        "19:30-21:00"
      ],
      days: [1, 2, 3, 4, 5, 6],
      toSend: {
      },
      width: 0,
      seen: false,
      left: 0,
      top: 0,
    };
  },
  watch: {
    code() {
      this.find();
    },
    /*names: function() {
      if (this.$route.params.type == "group") {
        Axios.get("/api/group").then(value => {
          this.names = value.data;
        });
      } else if (this.$route.params.type == "teacher") {
        Axios.get("/api/teacher").then(value => {
          this.names = value.data;
        });
      }
    },
    shedule: function() {
      if (this.$route.params.type == "group") {
        Axios.get("/api/lesson/?dtype=g").then(value => {
          this.shedule = value.data;
        });
      } else if (this.$route.params.type == "teacher") {
        Axios.get("/api/lesson/?dtype=t").then(value => {
          this.shedule = value.data;
        });
      }
    }*/
    link: function() {
      this.code = "";
      if (!this.$route.params.type) {
        this.names = [];
        this.shedule = false;
      } else if (this.$route.params.type == "group") {
        Axios.get("/api/group").then(value => {
          this.names = value.data;
        });
        Axios.get("/api/lesson/?dtype=g").then(value => {
          this.shedule = value.data;
        });
        Axios.get("/api/teacher").then(value => {
          this.toSend = value.data;
        });
      } else if (this.$route.params.type == "teacher") {
        Axios.get("/api/teacher").then(value => {
          this.names = value.data;
        });
        Axios.get("/api/lesson/?dtype=t").then(value => {
          this.shedule = value.data;
        });
        Axios.get("/api/group").then(value => {
          this.toSend = value.data;
        });
      }
      this.type = this.$route.params.type;
      /*if (this.$route.params.type == "group") {
        Axios.get("/api/lesson/?dtype=g").then(value => {
          this.shedule = value.data;
        });
      } else if (this.$route.params.type == "teacher") {
        Axios.get("/api/lesson/?dtype=t").then(value => {
          this.shedule = value.data;
        });
      }*/
    }
  },
  computed: {
    link: function() {
      return this.$route.params.type;
    }
  },
  beforeMount() {
    if (this.$route.params.type) {
      var t = this;
      var cur_rout = this.$route.params.type + "";
      var toSend = "/api/" + cur_rout;
      if (cur_rout == "group") {
        Axios.get(toSend).then(value => {
          t.names = value.data;
        });
        Axios.get("/api/lesson/?dtype=g").then(value => {
          t.shedule = value.data;
        });
        Axios.get("/api/teacher").then(value => {
          t.toSend = value.data;
        });
      } else if (cur_rout == "teacher") {
        Axios.get("/api/teacher").then(value => {
          t.names = value.data;
        });
        Axios.get("/api/lesson/?dtype=t").then(value => {
          t.shedule = value.data;
        });
        Axios.get("/api/group").then(value => {
          t.toSend = value.data;
        });
      }
      this.type = cur_rout;
    }
  },
  methods: {
    create() {
      //Axios.post("/api/lesson/",{discipline_id: 1, group_id: 1, teacher_id: 1, lecture_hall_id: 1});
      //Axios.get("/api/lesson/?dtype=g");
      //Axios.put("/api/lesson/187");
      if (this.width == 0) this.width = this.matchWidth();
      this.left = event.clientX;
      this.top = event.clientY;
      this.seen = true;
    },
    matchWidth() {
      return this.$refs.inputCard.clientWidth;
    },
    remove() {
      this.seen = false;
    },
    submit() {
      this.toSend.group = this.$refs.optGroup.value;
      this.toSend.discipline = this.$refs.optDiscipline.value;
      console.log(this.toSend.group, this.toSend.discipline);
    },
    find() {
      if (this.$route.params.type) {
        var toFind = "";
        var toFind2 = "";
        if (this.$route.params.type == "teacher") {
          toFind = "/api/teacher/?last_name=";
          toFind2 = "/api/lesson/?dtype=t&&teacher=";
        } else if (this.$route.params.type == "group") {
          toFind = "/api/group/?code=";
          toFind2 = "/api/lesson/?dtype=g&&group=";
        }
        Axios.get(toFind + this.code).then(value => {
          this.names = value.data;
        });
        Axios.get(toFind2 + this.code).then(value => {
          this.shedule = value.data;
        });
      } else {
        Axios.get("/api/group/?code=" + this.code).then(value => {
          this.names = value.data;
        });
      }
    },
    display() {
      Axios.get("/api/lesson/?group=" + this.code).then(value => {
        this.shedule = value.data;
      });
    }
  }
};
</script>
<style>
.layer {
  overflow-y: scroll; /* Добавляем полосы прокрутки */
  width: 100%; /* Ширина блока */
  height: 550px; /* Высота блока */
  border: 2px solid #f5f5f5;
}
.div_flow {
  overflow-x: scroll;
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
  height: 175px !important;
}
.temp {
  width: 130px;
}
.unselectable {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently*/
}
</style>