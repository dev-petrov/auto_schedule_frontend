<template>
  <div>
    <b-input placeholder="Аудитория" v-model="rooms"/>
    <b-button
      @click="$bvModal.show('modalLectureHall')"
      block
      variant="primary"
      class="mt-2"
      >Добавить</b-button
    >
    <b-table :items="lecture_halls" :fields="fields">
      <template #cell(edit)="row">
        <b-button
          class="btn btn-primary"
          @click="
            $router.replace({
              name: $route.name,
              query: {
                ...$route.query,
                id: row.item.id,
                modalType: 'modalLectureHall',
              },
            })
          "
        >
          Редактировать
        </b-button>
      </template>
    </b-table>
    <ModalLectureHall/>
  </div>
</template>

<script>
import "vue-select/dist/vue-select.css";
import ModalLectureHall from "./modals/ModalLectureHall.vue";
export default {
  components: { ModalLectureHall },
  data() {
    return {
        
      fields: [
        {
          key: "code",
          label: "Аудитория",
        },
        {
          key: "building",
          label: "Строение",
          formatter: (v) => {
            return this.$store.state.buildings[this.$store.state.buildings.findIndex(x => x.id == v)].name
          }
        },
        {
          key: "spaciousness",
          label: "Вместительность",
          formatter: (v) => {
            return v
          },
        },
        {
          key: "constraints",
          label: "Ограничения",
          formatter: (v) => {
            var tmp = 'Проектор: ' + (v.projector ? '+' : '-') +' Большая доска: '+ (v.big_blackboard ? '+' : '-')
            return tmp
          },
        },
        {
          key: "prof_type",
          label: "Тип",
          formatter: (v) => {
            if (v=='S')
                return 'Обычная'
            else if (v=="C")
                return 'Компьютерная'
            else if (v=='D')
                return 'Дизайн'
            else if (v=='L')
                return 'Лаборатория'
            else if (v=='M')
                return 'Мастерская'
          },
        },
        {
          key: "edit",
          label: "",
        },
      ],
      rooms: '',
    };
  },
  async beforeMount() {
      console.log(this.$store.state)
    if (this.$store.state.lecture_halls.length == 0) {
      await this.$store.dispatch("setLectureHalls");
    }
    if (this.$route.query.modalType === "modalLectureHall") {
      this.$bvModal.show("modalLectureHall");
    }
  },
  computed: {
    lecture_halls() {
      return this.$store.state.lecture_halls.filter((v) =>
        this.rooms != '' ? v.code.toLowerCase().includes(this.rooms.toLowerCase()) : true
      );
    },
  },
  watch: {
    $route() {
      if (this.$route.query.modalType === "modalLectureHall") {
        this.$bvModal.show("modalLectureHall");
      }
    },
  },
};
</script>

<style>
</style>