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
            <select class="custom-select" id="opt-group" ref="optGroup">
                <option v-for="group in groups" :key="group.id" :value="group.code">{{group.code}}</option>
            </select>
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label class="input-group-text temp" for="opt-lesson">Предмет</label>
            </div>
            <select class="custom-select" id="opt-lesson" ref="optDiscipline">
                <option v-for="(val,index) in shedule" :key="index" :value="val">{{val.discipline}}</option>
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
    data(){
        return{};
    },
    methods:{
        remove(){
            this.$emit("removeCard");
        }
    }
}
</script>