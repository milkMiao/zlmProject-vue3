// 获取一个指定面板下的所有列表集合
import { getLists } from "@/api"

export default {
    namespaced: true,

    state: {
        lists:[],
    },

    getters: {
        getLists: ({lists})=>{
            boardId => {
                lists.filter(list => { list.boardId === boardId })
            }
        }
    },
    
    mutations: {
        updateLists: (state, data)=>{
            state.lists = [ ...state.lists, data]
        },
    },

    actions: {
        getLists: async ({commit}, boardId) => {
            try {
                let rs = await api.getLists(boardId);
                commit('updateLists', res.data)

                return rs;
            } catch (e) {
                throw e;
            }
        }
    },

    modules: {

    }
}




