<template>
    <div>
        <div class="d-flex" id="table">
            <table class="table table-bordered">
                <thead class="thead">
                    <tr>
                        <th scope="col">ФИО</th>
                    </tr>
                </thead>
                <tbody class="tbody">
                    <tr v-for="(name, index) in names" :key="index">
                        <th scope="row">{{ name }}</th>
                    </tr>
                </tbody>
            </table>
            <div class="div_flow">
                <table class="table table-bordered ">
                    <thead class="thead">
                        <tr>
                            <th scope="col" colspan="7">ПН</th>
                            <th scope="col" colspan="7">ВТ</th>
                            <th scope="col" colspan="7">СР</th>
                            <th scope="col" colspan="7">ЧТ</th>
                            <th scope="col" colspan="7">ПТ</th>
                            <th scope="col" colspan="7">СБ</th>
                        </tr>
                    </thead>
                    <tbody class="tbody">
                        <tr v-for="(name, index) in names" :key="index">
                            <td v-for="(time, index) in times" :key="index" class="td_hover">
                                <p id='time'>{{time}}</p>
                                <p id="group"></p>
                                <p id='discipline'></p>
                                <p id='room'></p>
                            </td>
                            <td v-for="(time, index) in times" :key="index" class="td_hover">
                                <p id='time'>{{time}}</p>
                                <p id='group'></p>
                                <p id='discipline'></p>
                                <p id='room'></p>
                            </td>
                            <td v-for="(time, index) in times" :key="index" class="td_hover">
                                <p id='time'>{{time}}</p>
                                <p id='group'></p>
                                <p id='discipline'></p>
                                <p id='room'></p>
                            </td>
                            <td v-for="(time, index) in times" :key="index" class="td_hover">
                                <p id='time'>{{time}}</p>
                                <p id='group'></p>
                                <p id='discipline'></p>
                                <p id='room'></p>
                            </td>
                            <td v-for="(time, index) in times" :key="index" class="td_hover">
                                <p id='time'>{{time}}</p>
                                <p id='group'></p>
                                <p id='discipline'></p>
                                <p id='room'></p>
                            </td>
                            <td v-for="(time, index) in times" :key="index" class="td_hover">
                                <p id='time'>{{time}}</p>
                                <p id='group'></p>
                                <p id='discipline'></p>
                                <p id='room'></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            names: ['Петро', 'Не Петро'],
            times: ['9:00-10:30', '10:40-12:10', '12:20-13:50', '14:30-16:00', '16:10-17:40', '17:50-19:20', '19:30-21:00'],
        }
    }
}
</script>
<style>
.div_flow{
    overflow-x: auto;
    white-space: nowrap;
}

.td_hover:hover{
    background-color:#F5F5F5;
    cursor: pointer;
}

.table{
    margin:0;
}

tbody>tr{
    height: 190px !important; 
}
.temp{
    width:100px;
}
</style>