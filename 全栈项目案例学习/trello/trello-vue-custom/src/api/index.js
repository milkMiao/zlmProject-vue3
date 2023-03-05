import axios from 'axios'

//根据环境进行不同的配置 ， ===>新建.env.development文件进行配置
axios.defaults.baseURL= process.env.VUE_APP_SERVER_API_PATH

//axios.interceptors：拦截器
axios.interceptors.request.use( configs => { //请求拦截
    console.log('request----', configs)
    try {
        let storageData = JSON.parse(localStorage.getItem('user'));
        if (storageData.authorization) {
            configs.headers.common.authorization = storageData.authorization;
        }
    }catch (e) {}
    return configs;
} );

axios.interceptors.response.use(response => { //响应拦截
    console.log('response----', response)

    return response
}, error =>{
    let {message, errorDetails} = error.response.data;
    if (errorDetails) {
        message += ' : ' + errorDetails;
    }
    this.$message.error(message)

    throw error;
})

//1、用户User
export const register = data =>{ //代理配置 新建vue.config.js解决跨域等问题
   return axios({
        method:'post',
        url: '/user/register',
        data
   })
}
export const login = data => {
    return axios({
        method: 'post',
        url: '/user/login',
        data
    });
};

//2、面板Board
export const getBoards = data=>{ //获取全部面板
    return axios({
        method: 'get',
        url: '/board'
    })
}
// 新增面板
export const postBoard = data=>{
    return axios({
        method: 'post',
        url: '/board',
        data
    })
}
// 获取一个面板
export const getBoard = id => {
    return axios({
        url: '/board/' + id
    })
}

//3、获取一个指定面板下的所有列表集合 list
export const getLists = boardId => {
    return axios({
        url: '/list/',
        params:{
            boardId
        }
    })
}
//新增一个新的列表  
export const postList = data => {
    return axios({
        method: 'post',
        url: '/list',
        data
    })
};
//编辑一个指定的列表（拖拽后需要对列表数据更新）
export const putList = data => {
    return axios({
        method: 'put',
        url: '/list/' + data.id,
        data: {
            boardId: data.boardId,
            name: data.name,
            order: data.order
        }
    })
};

//4、获取一个指定列表下的所有--卡片集合 Card
export const getCards = boardListId =>{
    return axios({
        url: '/card/',
        params:{
            boardListId
        }
    })
}
// 添加一张卡片
export const postCard = data => {
    return axios({
        method: 'post',
        url: '/card',
        data
    })
};
// 编辑一个指定的卡片
export const putCard = data => {
    return axios({
        method: 'put',
        url: '/card/' + data.id,
        data: {
            boardListId: data.boardListId,
            name: data.name,
            description: data.description,
            order: data.order
        }
    })
};

// 5、上传附件
export const uploadAttachment = data => {
    let fd = new FormData();
    fd.append('boardListCardId', data.boardListCardId);
    fd.append('attachment', data.file);

    return axios({
        method: 'post',
        url: '/card/attachment',
        data: fd
    })
};
// 删除附件
export const removeAttachment = data => {
    return axios({
        method: 'delete',
        url: '/card/attachment/' + data.id
    });
};


// 6、设置封面
export const setCover = data => {
    return axios({
        method: 'put',
        url: '/card/attachment/cover/' + data.id
    });
};
// 移除封面
export const removeCover = data => {
    return axios({
        method: 'delete',
        url: '/card/attachment/cover/' + data.id
    });
};

// 7、获取评论列表
export const getComments = params => {
    return axios({
        url: '/comment',
        params
    })
};
// 添加评论
export const postComment = data => {
    return axios({
        method: 'post',
        url: '/comment',
        data
    })
};