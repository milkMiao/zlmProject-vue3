<template>
    <!--弹出式菜单,子项-->
    <div class="popup-menu">
        <ul class="popup-menu-list">
            <li v-for="item of items" 
                :key="item.command" 
                :class="{separator: item.separator}"
                @click="command(item.command)"
            >
                <span>{{item.name}}</span>
            </li>
        </ul>
            <!-- <li><span>添加卡…</span></li>
            <li><span>复制列表…</span></li>
            <li><span>移动列表</span></li>
            <li><span>关注 </span></li> -->
       
        <!-- <hr/>
        <ul class="popup-menu-list">
            <li><span>移动此列表中的所有卡片…</span></li>
            <li><span>归档这个列表中的所有卡…</span></li>
        </ul>
        <hr/>
        <ul class="popup-menu-list">
            <li><span>将此列表进行归档</span></li>
        </ul> -->
    </div>
</template>

<script>
export default {
    name:"TPopupMenu",
    props:{
        items: {
            // { name:'' , command:'layout', separator:true }
            type: Array,
            default(){
                return []
            }
        }
    },
    methods:{
        command(command){
            this.$emit('command', command)
        }
    }
}
</script>

<style>

</style>