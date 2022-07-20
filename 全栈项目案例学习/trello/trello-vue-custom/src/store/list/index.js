// 获取一个指定面板下的所有列表集合
import { getLists, postList, putList } from "@/api"
// import * as api from '@/api';  上下和替换

export default {
    namespaced: true,

    state: {
        lists: []
    },

    getters: {
        getLists: ({lists}) =>
            boardId => lists.filter(list=>list.boardId == boardId
        ),
        getList: ({lists}) => 
            listId => lists.find(list => list.id == listId
        )
    },

    mutations: {
        // 一个指定面本内：更新列表
        updateLists: (state, datas) => {
            state.lists = [...state.lists, ...datas];
        },

        //新增一个新的列表
        addList: (state, data) => {
            state.lists = [...state.lists, data];
        },
        //更新一个列表
        updateList: (state, data) => {
            state.lists = state.lists.map( list => {
                if (list.id === data.id) {
                    return {...list, ...data};
                }
                return list;
            } );
        }
    },

    actions: {
        //一个指定面本内：查看列表
        getLists: async ({commit}, boardId) => {
            try {
                let rs = await api.getLists(boardId);
                commit('updateLists', rs.data);
                return rs;
            } catch (e) {
                throw e;
            }
        },

        //新增一个列表
        postList: async ({commit}, data) => {
            try {
                let rs = await api.postList(data);
                commit('addList', rs.data);
                return rs;
            } catch (e) {
                throw e;
            }
        },
        //编辑一个列表
        editList: async ({commit}, data) => {
            try {
                let rs = await api.putList(data);
                commit('updateList', data);
                return rs;
            } catch (e) {
                throw e;
            }
        }

    }
}