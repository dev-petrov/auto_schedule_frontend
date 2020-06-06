<template>
  <div>
    <div class="container" v-if="this.$route.params.type">
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
          <a v-for="name in names" :key="name.id" class="mr-1">
            <span>{{name.code}}</span>
          </a>
        </p>
      </div>
    </div>
    <div class="d-flex mb-3" id="table">
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
      <div class="div_flow" v-if="shedule">
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
              <cell
                v-for="(time,index) in times"
                :key="index"
                :info="[time, shedule[name.id], 1, index+1]"
                @createCard="create"
              />
              <cell
                v-for="(time,index) in times"
                :key="index"
                :info="[time, shedule[name.id], 2, index+1]"
                @createCard="create"
              />
              <cell
                v-for="(time,index) in times"
                :key="index"
                :info="[time, shedule[name.id], 3, index+1]"
                @createCard="create"
              />
              <cell
                v-for="(time,index) in times"
                :key="index"
                :info="[time, shedule[name.id], 4, index+1]"
                @createCard="create"
              />
              <cell
                v-for="(time,index) in times"
                :key="index"
                :info="[time, shedule[name.id], 5, index+1]"
                @createCard="create"
              />
              <cell
                v-for="(time,index) in times"
                :key="index"
                :info="[time, shedule[name.id], 6, index+1]"
                @createCard="create"
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <FormLesson
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
    <SimpleCell></SimpleCell>
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
      shedule: {},
      times: [
        "9:00-10:30",
        "10:40-12:10",
        "12:20-13:50",
        "14:30-16:00",
        "16:10-17:40",
        "17:50-19:20",
        "19:30-21:00"
      ],
      toSend: {
        group: "",
        discipline: "",
        class: ""
      },
      width: 0,
      seen: false,
      left: 0,
      top: 0
    };
  },
  watch: {
    code() {
      if (this.$route.params.type) if (this.code != null) this.find();
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
      if (!this.$route.params.type) {
        this.names =[];
        this.shedule={};
      } else if (this.$route.params.type == "group") {
        Axios.get("/api/group").then(value => {
          this.names = value.data;
        });
        Axios.get("/api/lesson/?dtype=g").then(value => {
          this.shedule = value.data;
        });
      } else if (this.$route.params.type == "teacher") {
        Axios.get("/api/teacher").then(value => {
          this.names = value.data;
        });
        Axios.get("/api/lesson/?dtype=t").then(value => {
          this.shedule = value.data;
        });
      }
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
    } else if (cur_rout == "teacher") {
      Axios.get("/api/teacher").then(value => {
        t.names = value.data;
      });
      Axios.get("/api/lesson/?dtype=t").then(value => {
        t.shedule = value.data;
      });
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
          toFind = "/api/teacher/?teacher=";
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
      }
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
  height: 200px !important;
}
.temp {
  width: 130px;
}
</style>