<template>
  <div class="container">
    <div class="input-group mb-3 mt-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="code">{{ "Группа" }}</span>
      </div>
      <input
        type="text"
        class="form-control"
        :placeholder="'Код группы'"
        aria-label="code"
        aria-describedby="code"
        v-model="code_search"
        @click="
          code = '';
          code_search = code;
        "
      />
    </div>
    <div class="d-flex" v-if="code_search != '' && code === ''">
      <p>
        <button
          v-for="name in groups"
          :key="name.id"
          class="mr-1 btn btn-link btn-sm"
          @click="
            code = name.code;
            code_search = name.code;
            show();
          "
        >
          {{ name.code }}
        </button>
      </p>
    </div>
    <!-- Окно расписания -->
    <div class="d-flex flex-row row justify-content-around" v-if="schedule">
      <div
        class="d-flex flex-column col-lg-4 col-xs-6 mb-3"
        v-for="day in days"
        :key="day"
      >
        <thead class="thead card-header p-3">
          <th scope="col">{{ day_of_week[day] }}</th>
        </thead>
        <SimpleCell
          class="card"
          v-for="(time, index) in times"
          :key="index"
          :lesson="schedule[day][index + 1]"
          :time="time"
        ></SimpleCell>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleCell from "./cells/SimpleCell";
import defaults_ru from "../data/defaults_ru";

export default {
  components: {
    SimpleCell,
  },
  data() {
    return {
      code_search: "",
      code: "",
      day_of_week: defaults_ru.day_of_week,
      days: [1, 2, 3, 4, 5, 6],
      times: [
        "9:00-10:30",
        "10:40-12:10",
        "12:20-13:50",
        "14:30-16:00",
        "16:10-17:40",
        "17:50-19:20",
        "19:30-21:00",
      ],
    };
  },
  methods: {
    async show() {
      await this.$store.dispatch("setScheduleForOneEntity", {
        group: this.code,
      });
      this.$router.replace({
        name: this.$route.name,
        query: { ...this.$route.query, code: this.code },
      });
    },
  },
  computed: {
    groups() {
      return this.$store.state.groups.filter((v) =>
        v.code.includes(this.code_search)
      );
    },
    schedule() {
      return this.$store.state.lessons;
    },
  },
  async beforeMount() {
    if (this.$route.query.code) {
      this.code = this.$route.query.code;
      this.code_search = this.code;
      await this.show();
    }
  },
};
</script>

<style>
</style>