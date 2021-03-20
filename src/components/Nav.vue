 <template>
  <nav class="navbar navbar-dark bg-primary sticky-top navbar-expand-md">
    <a href="/" class="navbar-brand ml-3">
      <!-- <h5> -->
      <!-- <p> -->
      <!-- <span id="text">Расписание</span> -->
      <img src="../assets/logos.png" alt="Расписание" style="height: 55px" />
      <!-- </p> -->
      <!-- </h5> -->
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarResponsive"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto" v-if="$store.state.isAuthenticated">
        <li v-if="this.$route.query.dtype">
          <router-link to="/" class="btn btn-info mb-3 mt-3 mr-2"
            >На главную</router-link
          >
        </li>
        <li class="nav-item" v-if="this.$route.query.dtype">
          <button @click="push" class="btn btn-info mb-3 mt-3 mr-2">
            Сменить на
            <span v-if="this.$route.query.dtype == 'teacher'">
              <b>Группы</b>
            </span>
            <span v-else-if="this.$route.query.dtype == 'group'">
              <b>Преподаватели</b>
            </span>
          </button>
        </li>
        <li class="nav-item" v-if="!this.$route.query.dtype">
          <router-link
            to="/table?dtype=group"
            class="btn btn-info mb-3 mt-3 mr-2"
            >Сменить на Группы</router-link
          >
        </li>
        <li class="nav-item" v-if="!this.$route.query.dtype">
          <router-link
            to="/table?dtype=teacher"
            class="btn btn-info mb-3 mt-3 mr-2"
            >Сменить на Преподаватели</router-link
          >
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item" v-if="$store.state.isAuthenticated">
          <button
            @click="$store.dispatch('logout')"
            class="btn btn-danger mb-3 mt-3"
          >
            Выйти
          </button>
        </li>
        <li class="nav-item" v-else>
          <router-link to="/login" class="btn btn-success mb-3 mt-3"
            >Войти</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  methods: {
    refresh() {
      this.$emit("refresh");
    },
    push() {
      var next_type = "";
      if (this.$route.query.dtype == "teacher")
        next_type = "/table?dtype=group";
      else if (this.$route.query.dtype == "group")
        next_type = "/table?dtype=teacher";
      this.$router.push(next_type);
    },
  },
};
</script>