<template lang="">
    <b-container class="text-center">
      <b-input-group size="md" :prepend="param=='groups' ? 'Группа' : 'Преподаватель'" class="my-4">
        <b-form-input></b-form-input>
      </b-input-group>
      
      <b-row align-h="around">
        <template v-if="this.$route.name == 'teachers'">
          <RedactTeacher v-for="name in displayNames" :key="name.id" :name="name"/>
        </template>
        <template v-else-if="this.$route.name == 'groups'">
          <RedactGroup v-for="name in displayNames" :key="name.id" :name="name"/>
        </template>   
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
      :teacherID = teacherID
    />
    <ModalGroup
      id="modalGroup"
      :groupID = groupID
    />
    </b-container>
</template>
<script>
import CT from "./CardTeacher.vue";
import CG from "./CardGroup.vue"
import ModalTeacher from "./modals/ModalTeacher.vue";
import ModalGroup from "./modals/ModalGroup";
export default {
  name: "redact",
  components: { RedactTeacher: CT, RedactGroup: CG, ModalTeacher, ModalGroup },
  data() {
    return {
      currentPage: 1,
      perPage: 3,
      displayNames: 0,
      param: this.$route.name,
      id: 0,
      teacherID: 0,
      groupID: 0,
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
      this.param = this.$route.name;
      this.paginate(this.currentPage);
      this.showModal();
    },
  },
  async beforeMount() {
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
      var id = this.$route.query.id;
      if (modalType === "teacherModal" && id) {
        this.teacherID = id;
        this.$bvModal.show("modalTeacher");
      } else if (modalType === "groupModal" && id) {
        this.groupID = id;
        this.$bvModal.show("modalGroup");
      }
    },
  },
};
</script>
<style lang="">
</style>