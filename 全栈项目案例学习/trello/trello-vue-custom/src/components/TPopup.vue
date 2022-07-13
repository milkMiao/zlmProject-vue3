<template>
    <!--弹窗，可用于对话框、弹出式菜单等-->
    <!--弹出式菜单-->
    <div class="popup-container">
        <div @click="open">
            <slot></slot>
        </div>
       
        <!-- 动态计算弹框偏移量 style="left: 930px;top: 98px;display: block" -->
        <div class="popup" v-show="isShow" ref="popup">
            <div class="popup-header">
                <span class="popup-title">{{title}}</span>
                <a class="popup-header-close" @click="close" ref="close">
                    <i class="icon icon-close"></i>
                </a>
            </div>

            <div class="popup-content">
                <ul class="popup-menu-list">
                    <li><span>添加卡…</span></li>
                    <li><span>复制列表…</span></li>
                    <li><span>移动列表</span></li>
                    <li><span>关注 </span></li>
                </ul>
                <hr/>
                <ul class="popup-menu-list">
                    <li><span>移动此列表中的所有卡片…</span></li>
                    <li><span>归档这个列表中的所有卡…</span></li>
                </ul>
                <hr/>
                <ul class="popup-menu-list">
                    <li><span>将此列表进行归档</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TPopup",
    props: {
        title: {
            type: String,
            default: '菜单'
        }
    },
    data(){
        return {
            isShow: false
        }
    },
    methods:{
        open(){
            //弹出式菜单的位置动态控制
            this.isShow = true
            let $popup = this.$refs.popup

            window.addEventListener('click', this.close)

            this.$nextTick(()=>{
                $popup.style.left = '0px'
                //需要nextTick包裹，否则值全部为0
                // getBoundingClientRect：获取元素位置（用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置）
                // 注意：DOMRect {x: 1177, y: 36, width: 304, height: 317, top: 36, …} 1213 第一次点击按钮--显示弹出式菜单
                //      DOMRect {x: 905, y: 36, width: 304, height: 317, top: 36, …}  1213 关闭弹出式菜单，发现数据有变化，显示位置有问题，重置初始化left值
                let $popupRect = $popup.getBoundingClientRect(); 
                console.log("open----------",$popupRect,window.innerWidth)

                let left=0
                if($popupRect.right > window.innerWidth){ //超出屏幕宽度
                    left = -$popupRect.width + this.$el.offsetWidth
                }
                $popup.style.left = left +'px'
            });
            this.$emit('open')
        },
        close(e){
            console.log("close(e)-------", this.$refs.close, e)
            console.log("this.$el-----", this.$el)
            
            //this.$el为弹出式菜单组件本身
            if(!e || e.path.includes(this.$refs.close) || !e.path.includes(this.$el)){
                this.isShow = false
                this.$emit('close')
                window.removeEventListener('click', this.close);
            }
        }
    }
}
</script>

<style>

</style>