import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

let opts = {
  routes: [
    {
      path: "/", redirect:'/schedule',
      name: "Home",
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/schedule",
      name: "schedule",
      component: () => import('../components/TableForGroup.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import('../components/Login.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/table",
      name: "table",
      component: () => import('../components/Table.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
};
const router = new VueRouter(opts);

export default router
