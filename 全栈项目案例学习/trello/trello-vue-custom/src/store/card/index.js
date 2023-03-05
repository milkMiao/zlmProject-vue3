import * as api from '@/api'

export default{
    namespaced: true,
    state:{
        cards:[]
    },
    getters:{
        //获取卡片列表
        getCards: ({cards})=> {
            boardListId => {
                cards.filter( card =>card.boardListId === boardListId );
            }
        },
        //指定卡片信息
        getCard: ({cards}) => cardId => cards.find(card => card.id == cardId)
    },
    mutations:{
        updateCards: (state, datas)=>{
            state.cards = [...state.cards, ...datas]
        },

        //卡片
        addCard: (state, data) => {
            state.cards = [...state.cards, data];
        },
        updateCard: (state, data) => {
            state.cards = state.cards.map( card => {
                if (card.id === data.id) {
                    return {...card, ...data};
                }
                return card;
            } );
        },

        //附件
        addAttachment: (state, data) => {
            state.cards = state.cards.map( card => {
                if (card.id == data.boardListCardId) {
                    return {
                        ...card,
                        attachments: [...card.attachments, data]
                    }
                }
                return card;
            } );
        },
        removeAttachment: (state, data) => {
            state.cards = state.cards.map( card => {
                if (card.id == data.cardId) {
                    return {
                        ...card,
                        attachments: card.attachments.filter( attachment => attachment.id != data.id )
                    }
                }
                return card;
            });
        },

        //封面
        setCover: (state, data) => {
            state.cards = state.cards.map( card => {
                if (card.id == data.cardId) {
                    return {
                        ...card,
                        attachments: card.attachments.map( attachment => {
                            return {
                                ...attachment,
                                isCover: attachment.id == data.id
                            }
                        } )
                    }
                }
                return card;
            } );
        },
        removeCover: (state, data) => {
            state.cards = state.cards.map( card => {
                if (card.id == data.cardId) {
                    return {
                        ...card,
                        attachments: card.attachments.map( attachment => {
                            return {
                                ...attachment,
                                isCover: false
                            }
                        } )
                    }
                }
                return card;
            } );
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

        //添加卡片
        postCard: async ({commit}, data) => {
            try {
                let rs = await api.postCard(data);

                commit('addCard', rs.data);

                return rs;
            } catch (e) {
                throw e;
            }
        },
        //编辑卡片
        editCard: async ({commit}, data) => {
            try {
                let rs = await api.putCard(data);

                commit('updateCard', data);

                return rs;
            } catch (e) {
                throw e;
            }
        },

        //上传附件
        uploadAttachment: async ({commit}, data) => {
            try {
                let rs = await api.uploadAttachment(data);

                commit('addAttachment', rs.data);

                return rs;
            } catch (e) {
                throw e;
            }
        },
        //移除附件
        removeAttachment: async ({commit}, data) => {
            try {
                let rs = await api.removeAttachment(data);

                commit('removeAttachment', data);

                return rs;
            } catch (e) {
                throw e;
            }
        },

        //设置封面
        setCover: async ({commit}, data) => {
            try {
                let rs = await api.setCover(data);

                commit('setCover', data);

                return rs;
            } catch (e) {
                throw e;
            }
        },
        //移除封面
        removeCover: async ({commit}, data) => {
            try {
                let rs = await api.removeCover(data);

                commit('removeCover', data);

                return rs;
            } catch (e) {
                throw e;
            }
        }

    }

}