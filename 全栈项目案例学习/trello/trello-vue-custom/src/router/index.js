import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// import Home from '../views/Home.vue'

const Home = () => import(/* webpackChunkName: "home" */'../views/Home.vue')
const Board = () => import(/* webpackChunkName: "board" */'../views/Board.vue')
const Card = () => import(/* webpackChunkName: "Card" */ '../views/Card.vue')
const Login = () => import(/* webpackChunkName: "login" */'../views/Login.vue')
const Register = () => import(/* webpackChunkName: "register" */'../views/Register.vue')
const NoFound = () => import(/* webpackChunkName: "noFound" */'../views/NoFound.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/login', //登陆
    name: 'Login',
    component: Login
  },
  {
    path: '/register',//注册
    name: 'Register',
    component: Register
  },
  {
    path: '/',     //首页
    name: 'Home',
    // meta: {
    //   requiresAuth: true // 添加鉴权标识-权限管理
    // },
    component: Home
  },
  {
    path: '/board/:id(\\d+)', //看板
    name: 'Board',
    // meta: {
    //   requiresAuth: true // 添加鉴权标识
    // },
    component: Board,
    children: [
      // http://localhost:8080/board/1/list/1/card/1
        {
            path: 'list/:listId(\\d+)/card/:cardId(\\d+)', //弹框遮罩
            name: 'Card',
            component: Card
        }
    ]
    // component: () => import(/* webpackChunkName: "about" */ '../views/Broad.vue') //提取出来

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '*',
    name: 'NoFound',
    component: NoFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// store.commit('user/initUserInfo');//初始化用户信息

//全局路由守卫：初始化 & 每次路由变化之后触发
router.beforeEach((to, from, next) => {
  // 如果该路由需要授权访问，则验证用户信息
  if (
      to.matched.some( matched =>  matched.meta.requiresAuth)
      // && !store.state.user.info
  ) {
    next({
      name: 'Login'
    });
  } else {
    next();
  }
})

export default router;
