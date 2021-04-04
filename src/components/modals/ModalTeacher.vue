<template lang="">
    <b-modal id="modalTeacher" :title="name.last_name+' '+name.first_name+' '+name.middle_name">
        <div class="d-block">
          <b-input-group size="md" :prepend="'Фамилия'">
            <b-form-input type="text" :value="name.last_name"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block">
          <b-input-group size="md" :prepend="'Имя'">
            <b-form-input type="text" :value="name.first_name"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block">
          <b-input-group size="md" :prepend="'Отчество'">
            <b-form-input type="text" :value="name.middle_name"></b-form-input>
          </b-input-group>
        </div>
        <div class="d-block">
          <b-input-group size="md" :prepend="'Кол-во часов'">
            <b-form-input type="number" :value="name.total_hours"></b-form-input>
          </b-input-group>
        </div>
    </b-modal>
</template>
<script>
export default {
  props: ["name"],
  data(){
    return{
      param:this.$route.name
    }
  }
};
</script>
<style lang="">
</style>