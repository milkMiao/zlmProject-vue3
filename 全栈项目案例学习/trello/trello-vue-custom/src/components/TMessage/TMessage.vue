<template>
    <div class="message message-error is-center" v-show="!closed">
        <p class="message-content">提示信息：{{message}}</p>
        <i class="icon icon-close"></i>
    </div>
</template>
<script>
export default {
    data(){
        return {
            message: '这是默认信息',
            closed: false,
            duration: 1000, //1s之后
            timer: null, //自动隐藏提示--定时器
        }
    },
    mounted(){
        this.timer = setTimeout(() => {
            if(!this.closed){//true清空定时器,关闭消息提示
                this.onClosed();
            }
        }, this.duration);
    },
    methods:{
        onClosed(){
            this.closed = true
        }
    }
}
</script>
<style>

</style>