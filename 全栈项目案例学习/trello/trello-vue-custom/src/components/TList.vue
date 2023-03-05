<!--面板列表容器-->
<template>
    <!-- :data-order="data.order"  -->
    <div class="list-wrap list-wrap-content" :class="{ 'list-adding':false }" >
        <!-- 拖拽的list背景层 -->
        <div class="list-placeholder" ref="listPlaceholder"></div>

        <div class="list" ref="list" style="border:3px solid blueviolet;">
            <div class="list-header" ref="listHeader" style="background-color:pink;">
            <!-- @mousedown.prevent 阻止textarea等的默认行为 -->
                <textarea class="form-field-input" ref="newBoardListName" @mousedown.prevent @blur="editListName">To Do</textarea>
                <div class="extras-menu" @mousedown.prevent>
                    <span class="icon icon-more"></span>
                </div>
            </div>

            <!-- 卡片列表循环展示--TCard组件封装 -->
            <div class="list-cards">
                <t-card
                    v-for="card of cards"
                    :key="card.id"
                    :card="card"
                ></t-card>
                <!-- <div class="list-card" v-for="card of cards" :key="card.id">
                    <div class="list-card-cover"
                            style="background-image: url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png);"></div>
                    <div class="list-card-title">{{card.name}}</div>
                    <div class="list-card-badges">
                        <div class="badge" v-if="card.description">简介 
                            <span class="icon icon-description"></span>
                        </div>
                        <div class="badge" v-if="card.commentCount >0">评论
                            <span class="icon icon-comment"></span>
                            <span class="text">{{card.commentCount}}</span>
                        </div>
                        <div class="badge" v-if="card.attachments.length >0"> 附件
                            <span class="icon icon-attachment"></span>
                            <span class="text">{{card.attachments.length}}</span>
                        </div>
                    </div>
                </div> -->

                <div class="list-card-add-form">
                    <textarea class="form-field-input" ref="newListName" placeholder="为这张卡片添加标题……"></textarea>
                </div>
            </div>

            <div class="list-footer">
                <div class="list-card-add" @click="showListCardAddForm">
                    <span class="icon icon-add"></span>
                    <span>添加另一张卡片</span>
                </div>
                <div class="list-add-confirm">
                    <button class="btn btn-success" @click="addNewCard">添加卡片</button>
                    <span class="icon icon-close" @click="hideListCardAddForm"></span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import TCard from '@/components/TCard'
export default {
    name: 'TList',
    props: {
        data: {
            type: Object,
        }
    },
    components:{
        TCard
    },
    data(){
        return {
            //拖拽信息
            drag: {
                isDown: false,
                isDrag: false,
                downClientX: 0,
                downClientY: 0,
                downElementX: 0,
                downElementY: 0
            },
            listAdding: false,
            cards:[ //卡片列表
                {
                    id:1, 
                    userId:3, 
                    boardListId:2, 
                    name:'board-list-card1', 
                    description:'接口代码编写及测试', 
                    order: 536, 
                    createAt:'2022-07-01', 
                    updateAt:'2022-07-01',
                    commentCount: 2,//评论
                    attachments:[//附件
                        {
                            id:10,
                            userId:3,
                            boardListCardId:2,
                            isCover: false,
                            createAt: '2022-07-02T08:02:21.000Z',
                            updateAt: '2022-07-03T08:02:21.000Z',
                            detail: {
                                id:10,
                                userId:3,
                                originName: 'originName-7',
                                type:'image/png',
                                size: 10000,
                                createAt: '2022-07-02T08:02:21.000Z',
                                updateAt: '2022-07-03T08:02:21.000Z',
                            }
                        }
                    ],
                    coverPath: 'https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png',
                    // coverPath: '/public/attachments/attachment-2',//封面路径
                },
                {id:2, userId:2, boardListId:6, name:'board-list-card2', description:'board-list-card2', order: 131072, createAt:'2022-07-02T08:02:21.000Z', updateAt:'2022-07-03T08:02:21.000Z',commentCount: 3,attachments:[]},
                {id:3, userId:3, boardListId:4, name:'board-list-card3', description:'board-list-card3', order: 196608, createAt:'2022-07-07T08:02:21.000Z', updateAt:'2022-07-09T08:02:21.000Z',commentCount: 10,attachments:[]},
                {id:4, userId:1, boardListId:2, name:'board-list-card4', description:'board-list-card4', order: 327608, createAt:'2022-07-05T08:02:21.000Z', updateAt:'2022-07-03T08:02:21.000Z',commentCount: 9,attachments:[]},
            ]
        }
    },
    computed: {
        //获取卡片信息
        // cards(){
        //     // return this.$store.getters['card/getCards'](this.data.id)
        // }
    },
    //注意：在created 中被await 修饰的代码，执行顺序都在mounted内部--同步代码之后。
    async created() {
        //查询卡片信息
        // if(!this.cards.length){
        //     await this.$store.dispatch('card/getCards', this.data.id);
        // }
    },
    mounted() {
        //监听list列表的拖拽
        this.$refs.listHeader.addEventListener('mousedown', this.dragDown);//按下
        document.addEventListener('mousemove', this.dragMove);//移动
        document.addEventListener('mouseup', this.dragUp);//抬起
    },
    methods: {
        /*
        * 注意：clientX ， offsetX，screenX，pageX区别？
        * clientX：点击位置距离“当前body”可视区域的x，y坐标；
        * offsetX：相对于带有定位的“父盒子”的x，y坐标；
        * screenX：点击位置距离“当前电脑屏幕”的x，y坐标； 【注意：X，Y其实和screenX、screenY一样】
        * pageX：  对于“整个页面”来说，包括了被卷去的body部分的长度；
        */
        dragDown(e){//按下鼠标
            console.log("dragDown______1", e)
            this.drag.isDown = true
            this.drag.downClientX = e.clientX
            this.drag.downClientY = e.clientY

            let pos = this.$refs.list.getBoundingClientRet() //获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
            this.drag.downClientX = pos.x
            this.drag.downClientY = pos.y
            console.log("dragDown______2", this.drag)
        },
        dragMove(e){//拖拽移动列表--有点倾斜效果(动画样式处理！！！)
            if(this.drag.isDown){//按下
                let listElement = this.$refs.list;
                let x = e.clientX - this.drag.downClientX //拖拽前后偏移的距离
                let y = e.clientY - this.drag.downClientY
                //触发拖拽的条件
                if(x>10 || y>10){
                    // console.log('dragMove______', e)
                    if(!this.drag.isDrag){//判断目的为了区分是start，第一次进入还是move
                    //列表拖拽中，倾斜效果处理---transform设置，绝对定位！
                        this.drag.isDrag = true
                        console.log("拖拽start------")

                        //拖拽的list灰色背景层处理
                        this.$refs.listPlaceholder.style.height = listElement.offsetHeight + 'px';
                        listElement.style.position = 'absolute';
                        listElement.style.zIndex = 99999;
                        listElement.style.transform = 'rotate(5deg)';
                        document.body.appendChild(listElement);

                        this.$emit('dragStart', {
                            component: this
                        });
                    }
                    // console.log("拖拽move------")
                    listElement.style.left = this.drag.downElementX + x + 'px';
                    listElement.style.top = this.drag.downElementY + y + 'px';

                    this.$emit('dragMove', {
                        component: this,//当前组件
                        x: e.clientX,
                        y: e.clientY
                    });
                }
            }
        },
        dragUp(e){//抬起鼠标
            // console.log('dragMove______', e)
            if(this.drag.isDown){//是否按下
                if(this.drag.isDrag){//是否拖拽
                //拖拽后抬起，组件还原操作
                
                //拖拽的后list灰色背景层处理
                    this.$refs.listPlaceholder.style.height = 0;

                    listElement.style.position = 'relative';
                    listElement.style.zIndex = 0;
                    listElement.style.left = 0;
                    listElement.style.top = 0;
                    listElement.style.transform = 'rotate(0deg)';
                    this.$el.appendChild(listElement);

                    this.$emit('dragEnd', {
                        component: this
                    });
                } else {
                    if(e.path.includes(this.$refs.newBoardListName)){ //头部textarea获取
                        this.$refs.newBoardListName.select()
                    }
                }
            }
        },
        async editListName(){//编辑列表名称,textarea输入框
            let {value, innerHTML} = this.$refs.newBoardListName;
            // console.log(val, this.$refs.newBoardListName.innerHTML);

            if (value !== innerHTML) {
                await this.$store.dispatch('list/editList', {
                    boardId: this.data.boardId,
                    id: this.data.id,
                    name: value
                })
            }
        },

        //添加另一张卡片
        showListCardAddForm(){
            this.listAdding = true;
            this.$nextTick(() => {
                this.$refs.newListName.focus();
            });
        },
        //关闭卡片的添加操作
        hideListCardAddForm(){
            this.listAdding = false
            this.$refs.newListName.value = ''
        },
        //添加卡片
        addNewCard(){
            if (value.trim() !== '') {
                try {
                    this.$store.dispatch('card/postCard', {
                        boardListId: this.data.id,
                        name: value
                    });

                    this.$message.success('添加卡片成功');

                    this.listAdding = false;
                } catch (e) {}
            } else {
                this.$refs.newListName.focus();
            }
        }, 
        
    }
}
</script>

<style>

</style>