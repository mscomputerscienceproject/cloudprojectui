import Vue from "vue"
import Router from "vue-router"
import Signin from "../components/Signin.vue"
import Signup from "../components/Signup.vue"
import Forgot from "../components/Forgot.vue"
import ThankYou from "../components/ThankYou.vue"

Vue.use(Router)

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    //Common
    { path: "/Signin", name: "Signin", component: Signin },
    { path: "/ThankYou", name: "ThankYou", component: ThankYou },
    { path: "/Signup", name: "Signup", component: Signup },
    { path: "/Signin", name: "Signin", component: Signin },
    { path: "/Forgot", name: "Forgot", component: Forgot },
  ],
})

export default router
