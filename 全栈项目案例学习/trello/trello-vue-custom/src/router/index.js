import Vue from 'vue'
import VueRouter from 'vue-router'
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
    component: Home
  },
  {
    path: '/board/:id(\\d+)', //看板
    name: 'Board',
    component: Board,
    children: [
        {
            path: 'list/:listId(\\d+)/card/:cardId(\\d+)',
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

export default router
