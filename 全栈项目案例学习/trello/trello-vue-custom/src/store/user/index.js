import { register,login } from "../../api"

export default {
  state: {

  },
  mutations: {
    initUserInfo: state => {
      try {
        let data = JSON.parse(localStorage.getItem('user'));
        state.info = data;
      } catch (e) {}
    },
    updateUserInfo: (state, data) => {
      state.info = data;
      localStorage.setItem('user', JSON.stringify(data));
    },
    removeUserInfo: (state, data) => {
      state.info = null;
      localStorage.removeItem('user');
    }
  },
  actions: {
    register: ({}, data)=>{
      return register(data)
    },
    login: async ({commit}, data) => {
      try {
          let rs = await login(data);

          commit('updateUserInfo', {
              id: rs.data.id,
              name: rs.data.name,
              authorization: rs.headers.authorization //权限
          });

          return rs;
      } catch (e) {
          throw e;
      }
    },
    logout: async ({commit}) => {
        commit('removeUserInfo');
    }
  },
  modules: {

  }
}
