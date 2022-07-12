<template>
    <transition name="message-fade" @after-leave="handleAfterLeave">
     <!-- :style="positionStyle" -->
        <div
            :class="[
                'message',
                'message-' + type,
                center ? 'is-center' : ''
            ]"
            :style="{top: offset + 'px'}"
            v-if="!closed"
        >
            <p class="message-content">提示信息：{{message}}</p>
            <i class="icon icon-close"></i>
        </div>
    </transition>
</template>
<script>

    export default {
        name: 'TMessage',

        data() {
            return {
                closed: false,
                type: 'info',
                message: '',
                center: true,
                verticalOffset: 20,
                offset: 20,
                duration: 1000,
                timer: null,
                onClose: null
            }
        },

        mounted() {
            this.startTimer();
        },

        computed: {
            positionStyle() {
                return {
                    'top': `${ this.verticalOffset }px`
                };
            }
        },

       methods:{
            clearTimer() {
                clearTimeout(this.timer);
            },
            startTimer() {
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        if (!this.closed) {
                            this.close();
                        }
                    }, this.duration);
                }
            },
            handleAfterLeave() {
                this.$destroy();
                this.$el.parentNode.removeChild(this.$el);
            },
            close() {
                this.closed = true;
                if (typeof this.onClose === 'function') {
                    this.onClose(this);
                }
            }
       }
    }
</script>
<style>

</style>