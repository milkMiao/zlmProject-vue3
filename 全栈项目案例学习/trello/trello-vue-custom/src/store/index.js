import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: {
      staticPath: process.env.VUE_APP_SERVER_STATIC_PATH
  }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
  }
})
