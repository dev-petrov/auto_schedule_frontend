<template>
  <div>
    <div class="container">
      <div class="input-group mb-3 mt-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="code">{{
            dtype == TYPE_TEACHER ? "Преподаватель" : "Группа"
          }}</span>
        </div>
        <input
          type="text"
          class="form-control"
          :placeholder="
            dtype == TYPE_TEACHER ? 'ФИО преподавателя' : 'Код группы'
          "
          aria-label="code"
          aria-describedby="code"
          v-model="code"
        />
      </div>
      <div class="d-flex" v-if="!this.$route.params.type && code != '' && v">
        <p>
          <button
            v-for="name in names"
            :key="name.id"
            class="mr-1 btn btn-link btn-sm"
            @click="
              code = name.code;
              show();
            "
          >
            {{ name.code }}
          </button>
        </p>
      </div>
    </div>
    <div v-if="loaded" class="d-flex" style="max-height: 500px">
      <div style="width: 15%">
        <div>
          <table class="table table-bordered">
            <thead class="thead">
              <tr>
                <th scope="col">
                  {{ dtype == TYPE_GROUP ? "Группы" : "Преподаватели" }}
                </th>
              </tr>
              <tr>
                <th scope="col">{{ dtype == TYPE_GROUP ? "Код" : "ФИО" }}</th>
              </tr>
            </thead>
          </table>
        </div>
        <div ref="names" style="overflow-y: hidden; max-height: 488px">
          <table class="table table-bordered">
            <tbody class="tbody">
              <tr v-for="name in names" :key="name.id">
                <th scope="row">
                  <p class="text-center">
                    {{ name.code }}{{ name.last_name }}
                    <br />
                    {{ name.first_name }}
                    <br />
                    {{ name.middle_name }}
                  </p>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style="width: 85%">
        <div style="overflow: hidden" ref="times">
          <table class="table table-bordered">
            <thead class="thead">
              <tr>
                <th scope="col" colspan="7" v-for="day in days" :key="day.id">
                  <span>{{ day_of_week[day] }}</span>
                </th>
              </tr>
              <tr>
                <template v-for="(day, i) in days">
                  <th v-for="(time, index) in times" :key="`${index}&${day}&${i}`">
                    {{ time }}
                  </th>
                </template>
              </tr>
            </thead>
          </table>
        </div>
        <div class="layer" @scroll="scrollTable">
          <table class="table table-bordered">
            <tbody class="tbody">
              <tr v-for="name in names" :key="name.id">
                <template v-for="day in days">
                  <cell
                    v-for="(time, index) in times"
                    :key="`${name.id}&${day}&${index + 1}`"
                    :schedule="
                      schedule[String(name.id)][String(day)][String(index + 1)]
                    "
                    :type="dtype"
                    :person_id="name.id"
                    @create="create"
                  />
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div
      class="layer mb-0 d-flex justify-content-center align-items-center"
      v-else-if="this.$route.params.type"
      style="padding: 0 !important"
    >
      <div
        class="spinner-grow text-primary"
        style="width: 5rem; height: 5rem"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <FormLesson
      :mouseup="function (e) {}"
      :lesson='editLesson'
      @removeCard="remove"
      @update="update()"
      id="inputCard"
      ref="inputCard"
      :class="[seen ? '' : 'd-none']"
      style="position: absolute"
      :style="{ left: left + 'px', top: top + 'px' }"
    ></FormLesson>
  </div>
</template>
<script>
import Cell from "./Cell";
import FormLesson from "./forms/Lesson";
import defaults_ru from "../data/defaults_ru";
import http from "../http";

export default {
  components: {
    Cell,
    FormLesson,
  },
  data() {
    return {
      loaded: false,
      code: "",
      day_of_week: defaults_ru.day_of_week,
      TYPE_GROUP: "group",
      TYPE_TEACHER: "teacher",
      dtype: "group",
      times: [
        "9:00-10:30",
        "10:40-12:10",
        "12:20-13:50",
        "14:30-16:00",
        "16:10-17:40",
        "17:50-19:20",
        "19:30-21:00",
      ],
      days: [1, 2, 3, 4, 5, 6],
      width: 0,
      seen: false,
      left: 0,
      top: 0,
      editLesson: {},
    };
  },
  watch: {
    $route() {
      this.dtype = this.$route.query.dtype
        ? this.$route.query.dtype
        : this.TYPE_GROUP;
    },
  },
  computed: {
    names: function () {
      if (this.dtype == this.TYPE_TEACHER)
        return this.$store.state.teachers.filter((v) =>
          v.last_name.toLowerCase().includes(this.code.toLowerCase()) ||
          v.first_name.toLowerCase().includes(this.code.toLowerCase()) ||
          v.middle_name.toLowerCase().includes(this.code.toLowerCase())
        );
      else
        return this.$store.state.groups.filter((v) =>
          v.code.includes(this.code)
        );
    },
    schedule: function(){
      if (this.dtype == this.TYPE_GROUP) {
        return this.$store.state.lessons_by_groups;
      } else if (this.dtype == this.TYPE_TEACHER) {
        return this.$store.state.lessons_by_teachers;
      }
      return {};
    }
  },
  async beforeMount() {
    await this.$store.dispatch("setSchedule");
    await this.$store.dispatch("setTeachers");
    await this.$store.dispatch("setLectureHalls");
    this.dtype = this.$route.query.dtype
      ? this.$route.query.dtype
      : this.TYPE_GROUP;
    this.loaded = true;
  },
  methods: {
    scrollTable(e) {
      this.$refs["names"].scrollTop = e.target.scrollTop;
      this.$refs["times"].scrollLeft = e.target.scrollLeft;
    },
    async update() {
      if (this.link == this.TYPE_GROUP) {
        this.schedule = await http.getSchedule("g");
      } else if (this.link == this.TYPE_TEACHER) {
        this.schedule = await http.getSchedule("t");
      }
    },
    create(lesson) {
      if (this.width == 0) this.width = this.matchWidth();      
      var target = event.target;
      while(target.tagName != "TD") {
        target = target.parentElement;
      }
      this.left = target.getBoundingClientRect().left;
      this.top = target.getBoundingClientRect().top;
      this.editLesson = lesson;
      this.seen = true;
    },
    matchWidth() {
      return this.$refs.inputCard.clientWidth;
    },
    remove() {
      this.seen = false;
    },
  },
};
</script>
<style>
.card {
  border-radius: 0 !important;
}
.layer {
  /* overflow-y: scroll; Добавляем полосы прокрутки */
  overflow: auto;
  width: 100%; /* Ширина блока */
  height: 100%; /* Высота блока */
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

thead > tr {
  height: 20px !important;
}
thead > tr > th {
  min-width: 200px !important;
}

tbody > tr {
  height: 120px !important;
}

tbody > tr > td {
  max-width: 200px !important;
  min-width: 200px !important;
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