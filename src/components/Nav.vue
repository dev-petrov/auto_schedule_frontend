 <template>
  <div>
    <div class="container">
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="/">EasyTable</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="/">Расписание</b-nav-item>
            <b-nav-item-dropdown
              text="Изменить расписание"
              right
              v-if="$store.state.isAuthenticated"
            >
              <b-nav-item to="/table?dtype=group">Группы</b-nav-item>
              <b-nav-item to="/table?dtype=teacher">Преподаватели</b-nav-item>
            </b-nav-item-dropdown>
            <b-nav-item
              to="/table?dtype=teacher"
              v-if="$store.state.isAuthenticated"
              >Редактировать сущности</b-nav-item
            >
                <b-nav-item-dropdown
                  text="Пользователь"
                  right
                  v-if="$store.state.isAuthenticated"
                >
                  <b-nav-item to="#">Профиль</b-nav-item>
                  <b-button
                    variant="outline-danger"
                    @click="$store.dispatch('logout')"
                    >Выйти</b-button
                  >
                </b-nav-item-dropdown>
                <b-link
                  to="/login"
                  variant="outline-success"
                  class="btn btn-outline-success ml-5"
                  v-else>Войти</b-link
                >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
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