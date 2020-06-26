import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../auth' 

Vue.use(VueRouter)

/*let opts = {
  routes: [
    {
      path: "/", redirect:'/table',
      name: "Home",
      component: () => import('../components/Table.vue'),
      meta: {
        permissions: []
      }
    },
    {
      path: "/table",
      name: "table",
      component: () => import('../components/Table.vue'),
      meta: {
        permissions: []
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import('../components/Login.vue'),
      meta: {
        permissions: []
      }
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: Profile,
      meta: {
        permissions: [
          {
            role: "login",
            access: true
          },
          {
            role: "guest",
            access: false,
            redirect: "login"
          }
        ]
      }
    },
    {
      path: "/profile/:id",
      name: "profile",
      component: Profile,
      meta: {
        permissions: [
          {
            role: "login",
            access: true
          },
          {
            role: "guest",
            access: false,
            redirect: "login"
          }
        ]
      }
    },
    {
      path: "/:type",
      name: "type",
      component: () => import('../components/Table.vue'),
      meta: {
        permissions: [
          {
            role: "login",
            access: true
          },
          {
            role: "guest",
            access: false,
            redirect: "login"
          }
        ]
      }
    }
  ]
};*/
let opts = {
  routes: [
    {
      path: "/", redirect:'/table',
      name: "Home",
      component: () => import('../components/Table.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/table",
      name: "table",
      component: () => import('../components/Table.vue'),
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
      path: "/:type",
      name: "type",
      component: () => import('../components/Table.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
};
const router = new VueRouter(opts);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // всегда так или иначе нужно вызвать next()!
  }
})
/*const routes = [
    {
      path: '/', redirect:'/teacher',
      name: 'Home',
      component: () => import('../components/Table.vue')
    },
    {
      path: '/:type',
      name: 'type',
      component: () => import('../components/Table.vue')
    }
  ]

const router = new VueRouter({
    routes
})
*/
export default router
