import Vue from 'vue'
import App from './App.vue'
import router from './services/router'
import vuetify from './plugins/vuetify'
import store from './services/index.js'
import * as firebase from 'firebase'

Vue.config.productionTip = false

const configOptions = {
    apiKey: "AIzaSyAbdq2dZ2P6_b9EAk9nhE-S-ytIJ_qhA_I",
    authDomain: "tamilsangam-ccee0.firebaseapp.com",
    databaseURL: "https://tamilsangam-ccee0.firebaseio.com",
    projectId: "tamilsangam-ccee0",
    storageBucket: "tamilsangam-ccee0.appspot.com",
    messagingSenderId: "346000817286",
    appId: "1:346000817286:web:251af1723ea33d4aeee507"
   }
firebase.initializeApp(configOptions);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')