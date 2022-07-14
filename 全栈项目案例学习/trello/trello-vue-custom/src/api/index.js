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
//新增面板
export const postBoard = data=>{
    return axios({
        method: 'post',
        url: '/board',
        data
    })
}