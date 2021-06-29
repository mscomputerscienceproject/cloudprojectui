import Vue from 'vue'
import Router from 'vue-router'
import Signin from '../components/Signin.vue'
import Signup from '../components/Signup.vue'
import Forgot from '../components/Forgot.vue'
import ThankYou from '../components/ThankYou.vue'
import Successfull from '../components/Successfull'
import Enroll from '../components/Enroll.vue'

Vue.use(Router)


const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    //Common
    { path: '/', name: 'Enroll', component: Enroll },
    { path: '/Enroll', name: 'Enroll', component: Enroll },
    { path: '/Signup', name: 'Signup', component: Signup },
    { path: '/Signin', name: 'Signin', component: Signin },
    { path: '/Forgot', name: 'Forgot', component: Forgot },
    { path: '/ThankYou', name: 'ThankYou', component: ThankYou },
    { path: '/Successfull', name: 'Successfull', component: Successfull }
  ]
})

export default router
