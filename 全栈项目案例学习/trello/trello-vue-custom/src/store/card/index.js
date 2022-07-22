import * as api from '@/api'

export default{
    namespaced: true,
    state:{
        cards:[]
    },
    getters:{
        getCards: ({cards})=> {
            boardListId => {
                cards.filter( card =>card.boardListId === boardListId );
            }
        }
    },
    mutations:{
        updateCards: (state, datas)=>{
            state.cards = [...state.cards, ...datas]
        }
    },
    actions:{
        //查看列表内--卡片cards信息
        getCards: async ({commit}, boardListId) => {
            try {
                let rs = await api.getCards(boardListId);
                commit('updateCards', rs.data);
                return rs;
            } catch (e) {
                throw e;
            }
        },

    }

}