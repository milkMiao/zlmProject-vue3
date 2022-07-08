import axios from 'axios'

//根据环境进行不同的配置 ， ===>新建.env.development文件进行配置
axios.defaults.baseURL= process.env.VUE_APP_SERVER_API_PATH

axios.interceptors.request.use(configs => {
    return configs;
})
axios.interceptors.response.use(
    response =>{
        return response
    }, 
    error =>{
        this.$message.error(error.response.data.message)
        throw error;
    }
)

export const register = (data) =>{
   return axios({
        method:'POST',
        url: '/user/register',
        data
   })
}
