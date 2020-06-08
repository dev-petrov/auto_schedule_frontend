<template>
<div>
    <div class="card-header">
        <button class="close" id="btn-close" @click="remove"><span>×</span></button>
    </div>
    <div class="card-body">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text temp" for="opt-group"> Группа </label>
            </div>
            <select class="custom-select" id="opt-group" ref="optGroup" sele>
                <option v-for="i in info[0]" :key="i.id" :value="i.code || i.last_name">{{i.code}}{{i.last_name}}</option>
            </select>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text temp" for="opt-lesson">Предмет</label>
            </div>
            <select class="custom-select" id="opt-lesson" ref="optDiscipline">
                <option v-for="val in info[0].disciplines" :key="val.id" :value="val.title">{{val.title}}</option>
            </select>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text temp" for="opt-room">Аудитория</label>
            </div>
            <select class="custom-select" id="opt-room">      
                <option value="s"></option>  
            </select>
        </div>
        <button class="btn btn-block btn-primary">Submit</button>
    </div>
</div>
</template>
<script>
export default {
    name: "formLesson",
    props: ["info"],
    data(){
        return{
        };
    },
    methods:{
        remove(){
            this.$emit("removeCard");
        }
    }
}
</script>