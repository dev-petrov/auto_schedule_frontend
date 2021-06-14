<template>
  <b-modal
    id="modalUploadEducationPlan"
    @ok="saveData"
    title="Загрузить образовательный план из файла"
    @hidden="closeModal()"
    ok-title="Загрузить"
  >
    <b-alert show variant="warning"
      >Внимание, все данные будут перезаписаны!</b-alert
    >
    <div class="d-block my-2">
      <b-form-checkbox value="G" unchecked-value="A" v-model="type" switch
        >Загрузить по группе</b-form-checkbox
      >
    </div>
    <div v-if="type == 'G'" class="d-block my-2">
      <v-select
        v-model="group_id"
        id="groups"
        :options="$store.state.groups"
        placeholder="Выберите группу"
        label="code"
        value="id"
        :reduce="(v) => v.id"
      ></v-select>
    </div>
    <div class="d-block">
      <b-form-file
        accept=".xlsx"
        placeholder="Выберите файл или перетащите его сюда..."
        drop-placeholder="Перетащите файл сюда..."
        browse-text="Выбрать"
        v-model="file"
      ></b-form-file>
    </div>
  </b-modal>
</template>
<script>
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";
import axios from "axios";

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      file: null,
      group_id: "",
      type: "A",
    };
  },
  methods: {
    closeModal() {
      var q = { ...this.$route.query };
      this.$delete(q, "id");
      this.$delete(q, "modalType");
      this.$router.replace({
        name: this.$route.name,
        query: q,
      });
    },
    async saveData(bvModalEvt) {
      let formData = new FormData();
      formData.append("file", this.file);
      formData.append("group_id", this.group_id);
      formData.append("type", this.type);
      bvModalEvt.preventDefault();
      try {
        await axios.post("/api/education_plan/upload/", formData);
      } catch (error) {
        this.$bvModal.msgBoxOk(error.response.data, {
          title: "Ошибка",
          size: "sm",
          buttonSize: "sm",
          okVariant: "success",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true,
        });
        return;
      }
      this.$bvModal.hide('modalUploadEducationPlan');
    },
  },
};
</script>
<style lang="">
</style>