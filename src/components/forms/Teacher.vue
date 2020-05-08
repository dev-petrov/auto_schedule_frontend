<template>
  <div>
    <div class="card-header">
      <button class="close" id="btn-close" @click="remove">
        <span>×</span>
      </button>
    </div>
    <div class="card-body">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-name">Имя</label>
        </div>
        <input type="text" class="form-control" id="opt-name" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-surname">Фамилия</label>
        </div>
        <input type="text" class="form-control" id="opt-surname" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-patr">Отчество</label>
        </div>
        <input type="text" class="form-control" id="opt-patr" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-rest">Ограничения</label>
        </div>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-time">Рабочее время</label>
        </div>
        <input type="number" class="form-control" id="opt-time" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-type">Дисциплины</label>
        </div>
        <select class="custom-select" multiple>
          <option></option>
        </select>
      </div>
      <button class="btn btn-block btn-primary">Submit</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "formTeacher",
  data() {
    return {};
  },
  methods: {
    remove() {
      this.$emit("removeCard");
    }
  }
};
</script>