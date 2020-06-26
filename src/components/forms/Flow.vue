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
          <label class="input-group-text temp" for="opt-name">Поток</label>
        </div>
        <input type="text" class="form-control" id="opt-name">
      </div>
      <button class="btn btn-block btn-primary">Submit</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "formFlow",
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