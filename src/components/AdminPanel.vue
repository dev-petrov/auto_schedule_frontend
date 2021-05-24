<template lang="">
    <div class='container'>
        <EducationPlan v-if="this.$route.query.type=='education_plan'" />
        <Teachers v-if="this.$route.query.type=='teachers'" />
        <Groups v-if="this.$route.query.type=='groups'"/>
        <TrainingDirection v-if="this.$route.query.type=='training_direction'"/>
        <DisciplinesTable v-if="this.$route.query.type=='disciplines'"/>
        <RoomTable v-if="this.$route.query.type=='audience'"/>
    </div>
</template>
<script>
import EducationPlan from "./EducationPlanTable.vue";
import Teachers from "./TeachersTable.vue"
import Groups from "./GroupsTable.vue"
import TrainingDirection from "./TrainingDirectionTable.vue"
import DisciplinesTable from "./DisciplinesTable.vue"
import RoomTable from "./RoomTable.vue"
export default {
  components: {
    EducationPlan,
    Teachers,
    Groups,
    TrainingDirection,
    DisciplinesTable,
    RoomTable
  },
  data() {
    return {};
  },
  watch:{
    $route(){
    }
  },
};
</script>
<style lang="">
</style>