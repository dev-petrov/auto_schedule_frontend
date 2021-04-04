<template lang="">
<th scope="row" @click="setModal" class='td_hover'>
    <p class="text-center">
        {{ name.last_name }}
        <br />
        {{ name.first_name }}
        <br />
        {{ name.middle_name }}
    </p>
    </th>
</template>
<script>
export default {
    props: ["name"],
    methods:{
        setModal(){
            this.$emit("setModal", this.name.id);
        }
    }
};
</script>
<style lang="">
</style>