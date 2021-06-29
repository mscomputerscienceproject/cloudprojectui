import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import axios from 'axios'

Vue.use(Vuex)
const URL = 'https://clttsapi.herokuapp.com/api/getRoleByEmail/'

export default new Vuex.Store({
  state: {
    user: null,
    status: null,
    error: null,
    email: null,
    role: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setEmail (state, payload) {
      state.email = payload
    },
    removeUser (state) {
      state.user = null
    },
    setStatus (state, payload) {
      state.status = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setRole (state, payload) {
      state.role = payload
    }
  },
  actions: {
    sendPasswordResetEmail ({ commit }, payload) {
      commit('setStatus', 'loading')
      firebase.auth().sendPasswordResetEmail(payload.email)
        .then(() => {
          commit('setStatus', 'success')
        })
        .catch((error) => {
          commit('setError', error.message)
        })
    },
    signUpAction ({ commit }, payload) {
      commit('setStatus', 'loading')
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          alert('success')
          commit('setUser', response.user.uid)
          commit('setStatus', 'success')
          commit('setError', null)
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },
    signInAction ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit('setUser', response.user.uid)
          commit('setStatus', 'success')
          commit('setError', null)
          commit('setEmail', response.user.email)
          if (response.user.email != null) {
            axios.get(URL+response.user.email).then((response) => {
              if (response.data != null) {
                if (response.data.role === "SuperAdmin") {
                  commit('setRole', 'SuperAdmin')  
                } else if (response.data.role === "Admin"){
                  commit('setRole', 'Admin')
                } else if (response.data.role === "Volunteer"){
                  commit('setRole', 'Volunteer')
                } 
              } else {
                  commit('setRole', 'Member')
              } 
            })
          }
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },
    signOutAction ({ commit }) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null)
          commit('setStatus', 'success')
          commit('setError', null)
          commit('setEmail', null)
          commit('setRole', null)
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  getters: {
    status (state) {
      return state.status
    },
    user (state) {
      return state.user
    },
    email (state) {
      return  state.email
    },
    error (state) {
      return state.error
    },
    role (state) {
      return state.role
    }
  }
})