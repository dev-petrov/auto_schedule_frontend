import Axios from "axios";
import Vue from 'vue'

export default {
    isLoggedIn: false,
    loggedIn() {
        return parseInt(localStorage.getItem('isLoggedIn')) || 0;
    },
    login(username, password) {
        Axios.post("/api/auth/login/", { username: username, password: password }).then(data => {
            var user = data.data;
            console.log(user);
            localStorage.setItem('isLoggedIn', 1);
            location.href = "/#/teacher";
            Axios.defaults.headers.common['X-CSRFToken'] = Vue.$cookies.get('csrftoken');

        }).catch(() => {
            localStorage.setItem('isLoggedIn', 0);
            Axios.defaults.headers.common['X-CSRFToken'] = Vue.$cookies.get('csrftoken');

        });
    },
    logout() {
        Axios.post("/api/auth/logout/").then(() => {
            localStorage.setItem('isLoggedIn', 0);
            location.href = "/";
            Axios.defaults.headers.common['X-CSRFToken'] = Vue.$cookies.get('csrftoken'); 

        });
    },
    async checkAuth() {
        Axios.get("/api/auth/user/").then(() => {
            this.isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 1);

        }).catch(() => {
            localStorage.setItem('isLoggedIn', 0);
        });
    }
}