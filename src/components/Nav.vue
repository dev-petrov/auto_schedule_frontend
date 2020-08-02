 <template>
  <nav class="navbar navbar-dark sticky-top navbar-expand-md bg-dark">
    <a href="/" class="navbar-brand ml-3">
      <!-- <h5> -->
        <!-- <p> -->
          <!-- <span id="text">Расписание</span> -->
          <img src="../assets/logos.png" alt="Расписание" style="height:55px">
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
      <ul class="navbar-nav ml-auto">
        <li v-if="this.$route.params.type||!seen">
          <router-link to="/" class="btn btn-secondary mb-3 mt-3 mr-2">На главную</router-link>
        </li>
        <li class="nav-item" v-if="seen&&this.$route.params.type">
          <button @click="push" class="btn btn-secondary mb-3 mt-3 mr-2">
            Сменить на
            <span v-if="(this.$route.params.type == 'teacher')">
              <b>Группы</b>
            </span>
            <span v-else-if="(this.$route.params.type == 'group')">
              <b>Преподаватели</b>
            </span>
          </button>
        </li>
        <li class="nav-item" v-if="!this.$route.params.type&&seen">
          <router-link to="/group" class="btn btn-secondary mb-3 mt-3 mr-2">Сменить на Группы</router-link>
        </li>
        <li class="nav-item" v-if="!this.$route.params.type&&seen">
          <router-link
            to="/teacher"
            class="btn btn-secondary mb-3 mt-3 mr-2"
          >Сменить на Преподаватели</router-link>
        </li>
        <li class="nav-item" v-if="seen">
          <button @click="auth.logout" class="btn btn-secondary mb-3 mt-3">Выйти</button>
        </li>
        <li class="nav-item" v-else>
          <router-link to="/login" class="btn btn-secondary mb-3 mt-3">Войти</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import auth from "../auth";
export default {
  data() {
    return {
      auth: auth,
      seen: false
    };
  },
  watch: {
    $route: function() {
      if (auth.loggedIn() == 1) this.seen = true;
      else this.seen = false;
    }
  },
  methods: {
    refresh() {
      this.$emit("refresh");
    },
    push() {
      var next_type = "";
      if (this.$route.params.type == "teacher") next_type = "/group";
      else if (this.$route.params.type == "group") next_type = "/teacher";
      this.$router.push(next_type);
    }
  }
};
</script>