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
            
            <!-- 弹出式菜单 -->
            <t-popup>
                <button class="avatar">
                    <span>Z</span>
                </button>
            </t-popup>
        </div>
    </header>
</template>
<script>
import TPopup from '@/components/TPopup.vue'
    export default {
        name: 'THeader',
        components:{
            TPopup
        }
    }
</script>