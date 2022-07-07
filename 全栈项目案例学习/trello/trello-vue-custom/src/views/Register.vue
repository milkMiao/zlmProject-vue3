<template>
  <div id="register-login">
        <a class="logo" href="/"></a>

        <div class="section-wrapper">
            <div class="account-form">
                <h1>注册 Trello</h1>
                <form id="login-form" method="POST" @submit="registerSubmit">
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
                        <input type="button" class="btn" value="登录"/>
                    </div>
                </form>
            </div>

            <!-- 错误信息提示
                注：有可能用户疯狂点击，导致一直弹提示信息，甚至很多个提示信息显示，如何处理优化？
            -->
            <t-message></t-message>
        </div>

    </div>
</template>
<script>
import TMessage from '../components/TMessage/TMessage.vue';
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
            if(this.user.name.trim() !=='' || this.user.password.trim() !==''){
                return console.log('用户名或密码不能为空噢～')
            }
        }
    }
}
</script>

<style>

</style>