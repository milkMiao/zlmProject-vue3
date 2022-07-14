<template>
  <!-- <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
  <div id="home">
    <!--头部-->
    <THeader></THeader>

    <main>
        <h2>
            <span class="icon icon-board"></span>
            我的看板
        </h2>
        <ul class="board-items"> 
        <!-- 看板列表 -->
        <!--1、 动态：获取数据&渲染页面--但接口未通，暂用静态数据 -->
            <!-- <router-link
                v-for="board of boards"
                :key="board.id"
                class="board-item"
                tag="li"
                :to="{name: 'Board', params: {id: board.id}}"
            >
                 <span class="title">{{board.name}}</span>
            </router-link> -->

        <!--2、暂用静态数据渲染 -->
            <router-link class="board-item" tag="li" :to="{name:'Board', params:{id:1}}">
                <span class="title">看板1</span>
            </router-link>
            <router-link class="board-item" tag="li" :to="{name:'Board', params:{id:2}}">
                <span class="title">共同努力吧！</span>
            </router-link>
            <li  class="board-item">
                <span class="title">Welcome Board</span>
            </li>
            <li  class="board-item create-new-board">
                <textarea 
                    class="title form-field-input" 
                    placeholder="创建新看板"
                    ref="newBoardName"
                    @blur="addBoard"
                    >
                </textarea>
            </li>
        </ul>

    </main>
  </div>
</template>

<script>
import THeader from '@/components/THeader.vue'
import {mapState} from 'vuex'
export default {
    name: 'Home',
    components: {
        THeader
    },
   computed:{
        ...mapState('board', {
            boards: state => state.boards
        })
    },
    created() {
        console.log("create-----", this.boards)
        if(this.boards === null){//初始值为null，是首次获取，还是获取到的是一个空数据
            //dispatch：异步操作，数据提交至 actions ，可用于向后台提交数据
            //commit：  同步操作，数据提交至 mutations ，可用于登录成功后读取用户信息写到缓存里
            this.$store.dispatch('board/getBoards') 
        }
    },
    methods:{
        //创建新看板
        addBoard(){
           let val = this.$refs.newBoardName.value;
           
           if(val.trim() !== ''){
                try{
                    this.$store.dispatch('board/postBoard', {
                        name: val
                    });
                    this.$message.success('面板创建成功');
                    
                    this.$refs.newBoardName.value = ''
                } catch(e){ }
           }
        }
    }
}
</script>
