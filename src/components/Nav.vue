 <template>
  <div>
    <div class="container">
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand to="/">EasyTable</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/">Расписание</b-nav-item>
            <b-nav-item-dropdown
              text="Изменить расписание"
              right
              v-if="$store.state.isAuthenticated"
            >
              <b-dropdown-item to="/table?dtype=group">Группы</b-dropdown-item>
              <b-dropdown-item to="/table?dtype=teacher">Преподаватели</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown
              text="Редактировать сущности"
              right
              v-if="$store.state.isAuthenticated"
            >
              <b-dropdown-item to="/redact?type=education_plan">Образовательный план</b-dropdown-item>
              <b-dropdown-item to="/redact?type=teachers">Преподаватели</b-dropdown-item>
              <b-dropdown-item to="/redact?type=groups">Группы</b-dropdown-item>
              <b-dropdown-item to="/redact?type=training_direction">Направления подготовки</b-dropdown-item>
              <b-dropdown-item to="/redact?type=disciplines">Дисциплины</b-dropdown-item>
              <b-dropdown-item to="/redact?type=lecture_hall">Аудитории</b-dropdown-item>
            </b-nav-item-dropdown>
                <b-nav-item-dropdown
                  text="Пользователь"
                  right
                  v-if="$store.state.isAuthenticated"
                >
                  <!-- <b-nav-item to="#">Профиль</b-nav-item> -->
                  <b-button class="w-100"
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