import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('views/home/Home.vue')
const Profile = () => import('views/profile/Profile.vue')
const Cart=()=>import('views/cart/Cart.vue')
const Category=()=>import('views/category/Category.vue')
const Detail=()=>import('views/detail/Detail.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
   
    redirect:'/home'
  },
  {
    path:'/home',
    name: 'home',
    component:Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/category',
    name:'category',
    component:Category
  },
  {
    path:'/cart',
    name:'cart',
    component:Cart
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path:'/detail',
    name:'detail',
    component:Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
