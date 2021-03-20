<template>
  <div class="card-body">
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text temp" for="in-name">Логин</label>
      </div>
      <input type="text" class="form-control" id="in-name" v-model="username" />
    </div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <label class="input-group-text temp" for="in-pass">Пароль</label>
      </div>
      <input type="password" class="form-control" id="in-pass" v-model="password" />
    </div>
    <button @click="login" class="btn btn-block btn-primary">Войти</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch('login', {username:this.username, password:this.password});
      this.$router.replace({name: 'Home'}) // table
    },
  },
  beforeMount() {
    if (this.$store.state.isAuthenticated) {
      this.$router.replace({name: 'Home'})
    }
  }
};
</script>

<style>
.temp{
  width: 80px;
}
</style>