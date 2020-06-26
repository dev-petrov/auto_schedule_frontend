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
        <input type="text" class="form-control" id="opt-code" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-name">Название</label>
        </div>
        <input type="text" class="form-control" id="opt-name" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-type">Тип</label>
        </div>
        <select class="custom-select" id="opt-room">
          <option v-for="(val,index) in shedule" :key="index" :value="val">{{val.type}}</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text temp" for="opt-rest">Ограничения</label>
        </div>
        <select class="custom-select" multiple>
          <option>ЭЗ</option>
          <option>АВ</option>
          <option>ПК</option>
          <option>Пряники</option>
        </select>
      </div>
      <button class="btn btn-block btn-primary">Submit</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "formDirection",
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