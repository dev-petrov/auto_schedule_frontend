import Vuex from 'vuex'
import http from './http'
import Axios from 'axios'
import Vue from 'vue'

Vue.use(Vuex)

function createResult(data, type) {
    var result = new Map();
    for (var d of data) {
        var key = String(type == "g" ? d.group.id : d.teacher.id);
        if (!result[key]) {
            result[key] = {
                "1": {},
                "2": {},
                "3": {},
                "4": {},
                "5": {},
                "6": {},
            };
        }
        var day = String(d.day_of_week);
        // if (!result[key][day]) {
        //     result[key][day] = new Map();
        // }
        result[key][day][String(d.lesson)] = d;
    }
    return result;
}

function groupByDay(data) {
    var result = {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": [],
    };
    for (let d of data) {
        var key = String(d.day_of_week);
        result[key].push(d);
        result[key] = result[key].sort(v => v.lesson)
    }
    return result;
}

const store = new Vuex.Store({
    state: {
        user: null,
        isAuthenticated: false,
        disciplines: [],
        lecture_halls: [],
        groups: [],
        teachers: [],
        lessons_by_groups: {},
        lessons_by_teachers: {},
        lessons: null,
        buildings: [],
        education_plans: [],
        training_directions: [],
        flows: [],
    },
    mutations: {
        setDisciplines(state, disciplines) {
            state.disciplines = disciplines;
        },
        setEducationPlans(state, education_plans) {
            state.education_plans = education_plans;
        },
        setFlows(state, flows) {
            state.flows = flows;
        },
        setTrainingDirections(state, training_directions) {
            state.training_directions = training_directions;
        },
        setBuildings(state, buildings) {
            state.buildings = buildings;
        },
        setLectureHalls(state, lecture_halls) {
            state.lecture_halls = lecture_halls;
        },
        setGroups(state, groups) {
            state.groups = groups;
        },
        setTeachers(state, teachers) {
            state.teachers = teachers;
            console.log(teachers);
        },
        setSchedule(state, schedule) {
            state.lessons_by_groups = createResult(schedule, "g");
            state.lessons_by_teachers = createResult(schedule, "t");
        },
        setScheduleForOneEntity(state, schedule) {
            state.lessons = groupByDay(schedule);
        },
        setUser(state, user) {
            state.user = user;
        },
        setAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        updateOrCreateLesson(state, lesson) {
            Vue.set(state.lessons_by_groups[String(lesson.group.id)][String(lesson.day_of_week)], String(lesson.lesson), lesson)
            Vue.set(state.lessons_by_teachers[String(lesson.teacher.id)][String(lesson.day_of_week)], String(lesson.lesson), lesson)
        },
        deleteLesson(state, lesson) {
            Vue.delete(state.lessons_by_groups[String(lesson.group_id)][String(lesson.day_of_week)], String(lesson.lesson))
            Vue.delete(state.lessons_by_teachers[String(lesson.teacher_id)][String(lesson.day_of_week)], String(lesson.lesson))
        }
    },
    actions: {
        async setDisciplines(context) {
            var data = (await http.getList("Discipline", {}, true)).data;
            context.commit('setDisciplines', data);
        },
        async setEducationPlans(context) {
            var data = (await http.getList("EducationPlan", {}, true)).data;
            context.commit('setEducationPlans', data);
        },
        async setFlows(context) {
            var data = (await http.getList("Flow", {}, true)).data;
            context.commit('setFlows', data);
        },
        async setTrainingDirections(context) {
            var data = (await http.getList("TrainingDirection", {}, true)).data;
            context.commit('setTrainingDirections', data);
        },
        async setBuildings(context) {
            var data = (await http.getList("Building", {}, true)).data;
            context.commit('setBuildings', data);
        },
        async setLectureHalls(context) {
            var data = (await http.getList("LectureHall", {}, true)).data;
            context.commit('setLectureHalls', data);
        },
        async setGroups(context, filter = {}) {
            var data = (await http.getList("Group", filter, true)).data;
            context.commit('setGroups', data);
        },
        async setTeachers(context, filter = {}) {
            var data = (await http.getList("Teacher", filter, true)).data;
            context.commit('setTeachers', data);
        },
        async setSchedule(context, filter = {}) {
            var data = (await http.getList("Lesson", filter, true)).data;
            context.commit('setSchedule', data);
        },
        async setScheduleForOneEntity(context, filter = {}) {
            var data = (await http.getList("Lesson", filter, true)).data;
            context.commit('setScheduleForOneEntity', data);
        },
        async createLesson(context, data = {}) {
            var response = (await http.createItem('Lesson', data, true)).data;
            context.commit('updateOrCreateLesson', response);
        },
        async updateLesson(context, data = {}) {
            var response = (await http.updateItem('Lesson', data.id, data, true)).data;
            context.commit('updateOrCreateLesson', response);
        },
        async deleteLesson(context, data = {}) {
            (await http.deleteItem('Lesson', data.id, true));
            context.commit('deleteLesson', data);
        },
        async login(context, creds) {
            var username = creds.username;
            var password = creds.password;
            var reg_exp_mail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
            var login_info = {
                email: username,
                password: password
            }
            if (username.match(reg_exp_mail) != null) {
                login_info = {
                    email: username,
                    password: password
                }
            } else {
                login_info = {
                    username: username,
                    password: password
                }
            }
            var status = false;
            try {
                await (Axios.post("/api/auth/login/", login_info));
                status = true;
            } catch (error) {
                var data = error.response.data;
                if (data.non_field_errors) {
                    Vue.showErrorModal(data.non_field_errors);
                } else {
                    var result = '';
                    for (var k in data) {
                        result += `${k}: ${data[k]}\n`
                    }
                    Vue.showErrorModal(result);
                }
            }
            Axios.defaults.headers.common['X-CSRFToken'] = Vue.$cookies.get('csrftoken');
            await context.dispatch('checkAuth');
            return status;
        },
        async logout(context) {
            await Axios.post("/api/auth/logout/");
            context.commit('setAuthenticated', false);
            context.commit('setUser', {});
            Axios.defaults.headers.common['X-CSRFToken'] = Vue.$cookies.get('csrftoken');
        },
        async checkAuth(context) {
            try {
                var result = await Axios.get("/api/auth/user/");
                if (result.status != 200) {
                    context.commit('setUser', {});
                    return
                }
                context.commit('setAuthenticated', true);
                context.commit('setUser', result.data);
                Axios.defaults.headers.common['X-CSRFToken'] = Vue.$cookies.get('csrftoken');
            } catch (e) {
                context.commit('setUser', {});
            }
        },
    }
})

export default store;
