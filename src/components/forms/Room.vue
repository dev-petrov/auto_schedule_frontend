<template>
    <div>
        <div class="card-header">
            <button class="close" id="btn-close" @click="remove"><span>×</span></button>
        </div>
        <div class="card-body">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text temp" for="in-size"> Размер </label>
                </div>
                <input type="text" class="form-control" id="in-size"> 
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text temp" for="in-code">Код</label>
                </div>
                <input type="text" class="form-control" id="in-code"> 
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text temp" for="opt-build">Строение</label>
                </div>
                <select class="custom-select" id="opt-build">        
                </select>
            </div>
             <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text temp" for="opt-type">Проф. тип</label>
                </div>
                <select class="custom-select" id="opt-type">        
                </select>
            </div>
             <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <label class="input-group-text temp" for="opt-rest">Ограничения</label>
                </div>
                <select class="custom-select" id="opt-rest">        
                </select>
            </div>
            <button class="btn btn-block btn-primary">Submit</button>
        </div>
    </div>
</template>
<script>
export default {
    name: "formRoom",
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