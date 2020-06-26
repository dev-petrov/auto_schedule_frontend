import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import VueRouterPermissions from "vue-router-permissions";
import Axios from 'axios';
import auth from './auth';
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.config.productionTip = false
//Vue.use(VueRouterPermissions, router); 
auth.checkAuth().then(()=> {new Vue({
  router,
  render: h => h(App)
}).$mount('#app')});
Axios.defaults.headers.common['X-CSRFToken'] = Vue.$cookies.get('csrftoken'); 

/*let getUser = Axios.get("/api/auth/user/");
getUser.then(user => {
  user = user.data;
  if("detail" in user)
    user = {role:"guest"}
  else
    user = {role:"login"}
  Vue.prototype.$user = user;
  new Vue({
    render: h => h(App),
    router
  }).$mount("#app");
});*/