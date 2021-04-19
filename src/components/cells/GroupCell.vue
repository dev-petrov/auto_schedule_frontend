<template lang="">
<th scope="row" @click="setModal(name.id)" class='td_hover'>
    <p class="text-center">
        {{ name.code }}
    </p>
    </th>
</template>
<script>
export default {
  props: ["name"],
  methods: {
    setModal(id) {
      this.$router.replace({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          id: id,
          modalType:
            this.$route.query.dtype == 'teacher' ? "teacherModal" : "groupModal",
        },
      });
    },
  },
};
</script>
<style lang="">
</style>