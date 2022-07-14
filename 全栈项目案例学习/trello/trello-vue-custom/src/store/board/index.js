//Board 面板
// import { getBoards,postBoard } from "@/api"
import * as api from '@/api'; //等价===》上面书写方式

export default {
  namespaced: true,

  state: {
    //面板：设置为null，方便我们去判断当前是首次获取还是获取到的是一个空数据
    boards: null,
  },

  mutations: {
    updateBoards: (state, data)=>{
        state.boards = data
    },
    addBoard: (state,data)=>{
      if (state.boards === null) {
        state.boards = [];
      }
      state.boards = [...state.boards, data];
    }
  },

  actions: {
    //查询所有面板list
    getBoards: async ({commit})=>{
        try {
            let res = await api.getBoards();
            // commit： 同步操作，数据提交至 mutations ，可用于登录成功后读取信息写到缓存里
            commit('updateBoards', res.data)

            return res
        } catch(e){
            throw e
        }
    },

    //新增面板（输入面板名称）
    postBoard: async ({commit}, data)=>{
      try {
        let res = await api.postBoard(data);
        // commit： 同步操作，数据提交至 mutations
        commit('addBoard', res.data);

        return res
      } catch(e){
        throw e
      }
    }
  
  },
  modules: {

  }
}
