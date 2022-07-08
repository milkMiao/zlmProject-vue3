<template>
  <div id="register-login">
        <a class="logo" href="/"></a>

        <div class="section-wrapper">
            <div class="account-form">
                <h1>注册 Trello</h1>
                <!-- action="/register" method="POST"  -->
                <form id="login-form" @submit.prevent="registerSubmit">
                    <div>
                        <label>
                            <input v-model="user.name" class="form-field" autofocus="autofocus" placeholder="输入用户名"/>
                        </label>
                    </div>
                    <div>
                        <label>
                            <input v-model="user.password" type="password" class="form-field" placeholder="输入密码"/>
                        </label>
                    </div>
                    <div>
                        <label>
                            <input v-model="user.rePassword" type="password" class="form-field" placeholder="再次确认密码"/>
                        </label>
                    </div>
                    <div>
                        <input type="submit" class="btn btn-success" value="注册"/>
                        <span class="signin-signup-separator">或者</span>
                        <router-link :to="{name: 'Login'}" tag="button" class="btn">登录</router-link>
                    </div>
                </form>
            </div>

            <!-- 错误信息提示组件：
                 注：有可能用户疯狂点击，导致一直弹提示信息，甚至很多个提示信息显示，如何处理优化？【全局，组件销毁功能】
            -->
            <t-message></t-message>
        </div>

    </div>
</template>
<script>
import TMessage from '@/components/TMessage/TMessage.vue';
export default {
    name: 'Register',
    data(){
        return {
            user: {
                name: '',
                password: '',
                rePassword: ''
            },
        }
    },
    components: {
        TMessage
    },
    computed: {
      
    },
    methods:{
        registerSubmit(){
            console.log('表单注册')
            if(this.user.name.trim() =='' || this.user.password.trim() ==''){
                // 间隔时间最长，最后消失
                this.$message({
                    message:'111',
                    duration: 1000
                })
                this.$message({
                    message:'222',
                    duration: 3000
                })
                this.$message({
                    message:'333',
                    duration: 2000
                })
                return;
                return $message({
                    message: '用户名和密码不能为空',
                    type: 'error'
                });
            }
        },
       
    }
}
</script>

<style>

</style>