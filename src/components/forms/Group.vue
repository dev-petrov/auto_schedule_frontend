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
          <label class="input-group-text temp" for="opt-code">Код</label>
        </div>
        <input type="text" class="form-control" id="opt-code">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-size">Размер группы</label>
        </div>
        <input type="text" class="form-control" id="opt-size">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-training">Направление</label>
        </div>
        <select class="custom-select" id="opt-room">
          <option v-for="(val,index) in shedule" :key="index" :value="val">{{val.training}}</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-flow">Поток</label>
        </div>
        <select class="custom-select" id="opt-flow">
          <option v-for="(val,index) in shedule" :key="index" :value="val">{{val.flow}}</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-rest">Ограничения</label>
        </div>
      </div>
      <button class="btn btn-block btn-primary">Submit</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "formGroup",
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