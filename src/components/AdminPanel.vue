<template lang="">
    <div class='container'>
        <b-tabs content-class="mt-3" fill>
            <b-tab title="Образовательный план" @click="
                $router.replace({
                  name: $route.name,
                  query: {
                    ...$route.query,
                    type: 'EducationPlan',
                  },
                })
              " :active="this.$route.query.type=='teachers'"><EducationPlan/></b-tab>
            <b-tab title="Преподаватели" @click="
                $router.replace({
                  name: $route.name,
                  query: {
                    ...$route.query,
                    type: 'teachers',
                  },
                })
              " :active="this.$route.query.type=='teachers'"><Teachers/></b-tab>
            <b-tab title="Группы" @click="
                $router.replace({
                  name: $route.name,
                  query: {
                    ...$route.query,
                    type: 'groups',
                  },
                })
              " :active="this.$route.query.type=='groups'"><Groups/></b-tab>
            <b-tab title="Disabled" disabled><p>I'm a disabled tab!</p></b-tab>
        </b-tabs>
    </div>
</template>
<script>
import EducationPlan from "./EducationPlanTable.vue";
import Teachers from "./TeachersTable.vue"
import Groups from "./GroupsTable.vue"
export default {
  components: {
    EducationPlan,
    Teachers,
    Groups
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