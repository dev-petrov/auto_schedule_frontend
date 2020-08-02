<template>
  <div>
    <div class="card-header ">
      <button class="btn btn-secondary mr-1" @click="del">Удалить</button>
      <span v-if="seen" >Все поля должны быть заполнены</span>
      <button class="close ml-1" id="btn-close" @click="remove">
        <span style="font-size: 20px !important">×</span>
      </button>
    </div>
    <div class="card-body">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label
            v-if="this.$route.params.type=='group'"
            class="input-group-text temp"
            for="opt-group"
          >Преподаватели</label>
          <label
            v-else-if="this.$route.params.type=='teacher'"
            class="input-group-text temp"
            for="opt-group"
          >Группы</label>
        </div>
        <select
          class="custom-select"
          id="opt-group"
          ref="optGroup"
          v-model="name"
          :required="!name"
        >
          <!-- <option v-if="i.last_name==info[2][0] || i.code==info[2][0]" :value="i.code || i.last_name" selected>{{i.code}}{{i.last_name}} </option> -->
          <option v-for="(i, index) in names" :key="index" :value="i.id">{{i.name}}</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-lesson">Предмет</label>
        </div>
        <select
          class="custom-select"
          id="opt-lesson"
          ref="optDiscipline"
          v-model="lesson"
          :required="!lesson"
        >
          <option v-for="(val, index) in lessons" :key="index" :value="val.id">{{val.title}}</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-room">Аудитория</label>
        </div>
        <select class="custom-select" id="opt-room" v-model="room" :required="!room">
          <option
            v-for="(i, index) in rooms"
            :key="index"
            :value="i.id"
          >{{i.code}} ({{i.spaciousness}})</option>
        </select>
      </div>
      <button class="btn btn-block btn-primary" type="submit" @click="submit">Submit</button>
    </div>
  </div>
</template>
<script>
import Axios from "axios";
import $ from "jquery"; // подключаем jQuery
import "bootstrap";
export default {
  props: ["info"],
  data() {
    return {
      name: "",
      lesson: "",
      room: "",
      rooms: [],
      seen: false,
    };
  },
  watch: {
    info() {
      this.name = this.info[0].type;
      this.lesson = this.info[0].lesson;
      this.room = this.info[0].rooms;
      for (var a in this.info[0].names) {
        if (this.info[0].names[a].id == this.name) {
          this.lessons = this.info[0].names[a].disciplines;
        }
      }
    },
    name() {
      for (var a in this.info[0].names) {
        if (this.info[0].names[a].id == this.name) {
          this.lessons = this.info[0].names[a].disciplines;
        }
      }
    },
    lesson() {
      if (this.lesson != "") {
        var tmp;
        for (var a in this.info[0].discipline)
          if (this.info[0].discipline[a].id == this.lesson) {
            tmp = this.info[0].discipline[a];
            break;
          }
        var i = 0;
        this.rooms = [];
        for (var r in this.info[0].room) {
          if (
            (this.info[0].room[r].constraints.id == 1 ||
              this.info[0].room[r].constraints.id == tmp.constraints.id ||
              tmp.constraints.id == 4) &&
            (this.info[0].room[r].prof_type == tmp.prof_type ||
              tmp.prof_type == "S")
          ) {
            this.rooms[i] = { id: null, code: "", spaciousness: "" };
            this.rooms[i].id = this.info[0].room[r].id;
            this.rooms[i].code = this.info[0].room[r].code;
            this.rooms[i].spaciousness = this.info[0].room[r].spaciousness;
            i++;
          }
        }
      }
    }
  },
  computed: {
    link() {
      return this.$route.params.type;
    },
    names() {
      var tmp = [];
      var t = 0;
      for (var i in this.info[0].names) {
        tmp[t] = { name: "", id: null };
        if (this.$route.params.type == "teacher")
          tmp[t].name =
            this.info[0].names[i].code +
            " (" +
            this.info[0].names[i].count_of_students +
            ")";
        else
          tmp[t].name = `${this.info[0].names[i].last_name} ${
            this.info[0].names[i].first_name[0]
          }.${
            this.info[0].names[i].middle_name
              ? this.info[0].names[i].middle_name[0] + "."
              : ""
          }`;
        tmp[t].id = this.info[0].names[i].id;
        t++;
      }
      return tmp;
    }
  },
  methods: {
    remove() {
      this.$emit("removeCard");
      this.seen = false;
    },
    async del() {
      for (var a in this.info[0].shedule) {
        if (
          this.info[0].shedule[a].day_of_week == this.info[0].dow_les[0] &&
          this.info[0].shedule[a].lesson == this.info[0].dow_les[1]
        ) {
          var lesson_id = this.info[0].shedule[a].id;
        }
      }
      await Axios.delete(`/api/lesson/${lesson_id}/`);
      await this.$emit("update");
      this.remove();
    },
    async submit() {
      // for (var a in this.info[0].shedule) {
      //   if (
      //     this.info[0].shedule[a].day_of_week == this.info[0].dow_les[0] &&
      //     this.info[0].shedule[a].lesson == this.info[0].dow_les[1]
      //   )

      // }
      if (this.name != "" && this.lesson != "" && this.room != "") {
        this.seen = false
        var res;
        if (this.info[0].type != 0) {
          for (var a in this.info[0].shedule) {
            if (
              this.info[0].shedule[a].day_of_week == this.info[0].dow_les[0] &&
              this.info[0].shedule[a].lesson == this.info[0].dow_les[1]
            ) {
              var lesson_id = this.info[0].shedule[a].id;
            }
          }
          if (this.link == "teacher") {
            res = await Axios.put(`/api/lesson/${lesson_id}/`, {
              teacher_id: this.info[0].id,
              group_id: this.name,
              discipline_id: this.lesson,
              lesson: this.info[0].dow_les[1],
              day_of_week: this.info[0].dow_les[0],
              lecture_hall_id: this.room
            }).catch(() => {
              $("#myModal").modal("show");
              return 0;
            });
          } else if (this.link == "group") {
            res = await Axios.put(`/api/lesson/${lesson_id}/`, {
              teacher_id: this.name,
              group_id: this.info[0].id,
              discipline_id: this.lesson,
              lesson: this.info[0].dow_les[1],
              day_of_week: this.info[0].dow_les[0],
              lecture_hall_id: this.room
            }).catch(() => {
              $("#myModal").modal("show");
              return 0;
            });
          }
        } else {
          if (this.link == "teacher") {
            res = await Axios.post("/api/lesson/", {
              teacher_id: this.info[0].id,
              group_id: this.name,
              discipline_id: this.lesson,
              lesson: this.info[0].dow_les[1],
              day_of_week: this.info[0].dow_les[0],
              lecture_hall_id: this.room
            }).catch(() => {
              $("#myModal").modal("show");
              return 0;
            });
          } else if (this.link == "group") {
            res = await Axios.post("/api/lesson/", {
              teacher_id: this.name,
              group_id: this.info[0].id,
              discipline_id: this.lesson,
              lesson: this.info[0].dow_les[1],
              day_of_week: this.info[0].dow_les[0],
              lecture_hall_id: this.room
            }).catch(() => {
              $("#myModal").modal("show");
              return 0;
            });
          }
        }
        if (res.status == 200 || res.status == 201) {
          await this.$emit("update");
          this.remove();
        }
      } else {
        this.seen = true;
      }
    }
  }
};
</script>
<style>
* {
  font-size: 12px;
}
</style>