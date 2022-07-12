<template>
  <div id="register-login">
        <a class="logo" href="/"></a>

        <div class="section-wrapper">
            <div class="account-form">
                <h1>注册 Trello</h1>
                <form id="login-form" method="POST" @submit.prevent="registerSubmit">
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

        </div>

    </div>
</template>
<script>

// import TMessage from '@/components/TMessage/TMessage.vue'; //挂载全局使用，无需单个引入
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
        // TMessage
    },
    methods:{
        async registerSubmit(){
            if(this.user.name.trim() =='' || this.user.password.trim() ==''){
                // return this.$message({
                //     message: '用户名和密码不能为空',
                //     type: 'error'
                // });

                // 间隔时间最长，最后消失
                this.$message({message:'111',duration: 1000,type:'error'})
                this.$message({message:'222', duration: 3000,type: 'warning'})
                this.$message({message:'333',duration: 2000, type: 'success'})
                this.$message({message:'444',duration: 4000,type: 'info'})
                return;
            }
            if(this.user.password !== this.user.rePassword){
                return this.$message({
                    message:'两次密码不一致，请重新输入',
                    type:'error'
                })
            }
            try {
                await this.$store.dispatch('user/register',{
                    ...this.user
                })
                this.$message.success('注册成功！')
                this.$router.push({name:'Login'})
            } catch(e){
                console.log('catch----',e)
            }
        },
       
    }
}
</script>

<style>

</style>