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
    <button @click="login" class="btn btn-block btn-primary">Submit</button>
    <p v-if="seen">Неправильный логин или пароль</p>
  </div>
</template>

<script>
import auth from "../auth";
export default {
  data() {
    return {
      username: "",
      password: "",
      seen: false
    };
  },
  methods: {
    login() {
      auth.login(this.username, this.password);
      this.seen = true;
    },
  }
};
</script>

<style>
.temp{
  width: 80px;
}
</style>