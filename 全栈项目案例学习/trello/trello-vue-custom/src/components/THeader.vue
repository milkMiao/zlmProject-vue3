<template>
    <header>
        <div class="left">
            <router-link :to="{name: 'Home'}">
                <a href="" class="btn btn-icon">
                    <i class="icon icon-home"></i>
                </a>
            </router-link>
            <router-link :to="{name:'Home'}">
                <a href="" class="btn btn-icon">
                    <i class="icon icon-board"></i>
                    <span class="txt">看板</span>
                </a>
            </router-link>
        </div>
        <router-link :to="{name:'Login'}">
             <a href="/" class="logo"></a>
        </router-link>
        <div class="right">
            <a href="" class="btn btn-icon">
                <i class="icon icon-add"></i>
            </a>
            
            <!-- 弹出式菜单组件 -->
            <t-popup :title="title" ref="tPopup">
                <button class="avatar">
                    <span>Z</span>
                </button>

                <!-- 弹出菜单组件--子项组件 ，list内的item -->
                <t-popup-menu 
                    slot="popup-content-item" 
                    :items="menuItems" 
                    @command="command">
                </t-popup-menu>
            </t-popup>
        </div>
    </header>
</template>
<script>
import TPopup from '@/components/TPopup.vue'
import TPopupMenu from '@/components/TPopupMenu'
import {mapState} from 'vuex'
    export default {
        name: 'THeader',
        components:{
            TPopup,
            TPopupMenu
        },
        data(){
            return {
                title:"菜单项",
                menuItems:[
                    { name:'退出' , command:'logout', separator:true } //separator 分割线样式
                ]
            }
        },
        computed:{
            ...mapState('user', {
                user: state => state.info
            })
        },
        methods:{
            // 弹出菜单--子项组件点击事件
            command(e){
                console.log('弹出菜单--子项组件点击事件-----', e)
                switch(e){
                    case 'logout':
                        this.logout();
                        break;
                    default:
                        break;
                }
            },
            logout(){//退出
                this.$store.dispatch('user/logout');
                this.$router.push({name:'Login'})

                // this.$refs.tPopup.close()//关闭---弹出菜单组件
            }
        }
    }
</script>