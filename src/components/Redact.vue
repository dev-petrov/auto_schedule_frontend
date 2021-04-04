<template lang="">
    <b-container class="text-center">
      <b-input-group size="md" :prepend="param=='groups' ? 'Группа' : 'Преподаватель'" class="my-4">
        <b-form-input></b-form-input>
      </b-input-group>
      
      <b-row align-h="around">
            <redact-card v-for="name in displayNames" :key="name.id" :name="name"></redact-card>
      </b-row>
       
      <b-pagination
      v-model="currentPage"
      :total-rows="names.length"
      :per-page="perPage"
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      @input="paginate(currentPage)"
      align="center"
      class="mt-4"
    ></b-pagination>
    <ModalTeacher
      id="modalTeacher"
      :name = names[id]
    />
    </b-container>
</template>
<script>
import RC from "./CardTeacher.vue";
import ModalTeacher from "./modals/ModalTeacher.vue";
export default {
  name: "redact",
  components: { "redact-card": RC, ModalTeacher },
  data() {
    return {
      currentPage: 1,
      perPage: 3,
      displayNames: 0,
      param:this.$route.name,
      id: 0
    };
  },
  computed: {
    names: function () {
      if (this.$route.name == "teachers") return this.$store.state.teachers;
      else return this.$store.state.groups;
    },
  },
  watch: {
    $route() {
      this.param = this.$route.name
      this.paginate(this.currentPage);
      this.showModal()
    },
  },
  async beforeMount() {
    await this.$store.dispatch("setSchedule");
    await this.$store.dispatch("setTeachers");
    await this.$store.dispatch("setLectureHalls");
    await this.$store.dispatch("setDisciplines");
  },
  methods: {
    paginate(currentPage) {
      const start = (currentPage - 1) * this.perPage;
      this.displayNames = this.names.slice(start, start + 3);
    },
    showModal() {
      var modalType = this.$route.query.modalType;
      this.id = this.$route.query.id;
      console.log(this.names[this.id])
      if (modalType === 'teacherModal' && this.id){
        this.$bvModal.show('modalTeacher')
        this.id--
      }
    },
  },
};
</script>
<style lang="">
</style>