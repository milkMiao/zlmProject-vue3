<template>
  <div id="board">
    <!--头部-->
    <t-header></t-header>

    <!--正文-->
    <main v-if="true">

        <h2>
            test
            <span class="btn btn-icon">
                邀请
            </span>
        </h2>

        <!--面板容器-->
        <div class="board">


            <!--面板列表容器-->
            <t-list 
                @dragStart="dragStart"
                @dragMove="dragMove"
                @dragEnd="dragEnd"
            ></t-list>
            <!-- <t-list
                v-for="list of lists"
                :key="list.id"
                :data="list"
                @dragStart="dragStart"
                @dragMove="dragMove"
                @dragEnd="dragEnd"
            ></t-list> -->

            <!--面板列表容器,静态文本-->
            <div class="list-wrap list-adding">

                <div class="list-placeholder"></div>

                <div class="list">
                    <div class="list-header">
                        <textarea class="form-field-input">To Do</textarea>
                        <div class="extras-menu">
                            <span class="icon icon-more"></span>
                        </div>
                    </div>

                    <div class="list-cards">

                        <div class="list-card">
                            <div class="list-card-title">接口代码编写及测试</div>
                            <div class="list-card-badges">
                                <div class="badge">
                                    <span class="icon icon-description"></span>
                                </div>
                                <div class="badge">
                                    <span class="icon icon-comment"></span>
                                    <span class="text">2</span>
                                </div>
                                <div class="badge">
                                    <span class="icon icon-attachment"></span>
                                    <span class="text">5</span>
                                </div>
                            </div>
                        </div>

                        <div class="list-card-add-form">
                            <textarea class="form-field-input" placeholder="为这张卡片添加标题……"></textarea>
                        </div>

                    </div>

                    <div class="list-footer">
                        <div class="list-card-add">
                            <span class="icon icon-add"></span>
                            <span>添加另一张卡片</span>
                        </div>
                        <div class="list-add-confirm">
                            <button class="btn btn-success">添加卡片</button>
                            <span class="icon icon-close"></span>
                        </div>
                    </div>
                </div>

            </div>

            <!--无内容列表容器-->
            <div class="list-wrap no-content" :class="{'list-adding': listAdding}">

                <div class="list-add" @click="showListAdding">
                    <span class="icon icon-add"></span>
                    <span>添加另一个列表</span>
                </div>

                <div class="list">
                    <div class="list-cards">
                        <div class="list-card-add-form">
                            <input class="form-field-input" ref="newListName" placeholder="为这张卡片添加标题……" />
                        </div>
                    </div>

                    <div class="list-footer">
                        <div class="list-add-confirm">
                            <button class="btn btn-success" @click="addNewList">添加列表</button>
                            <span class="icon icon-close" @click="hiddenListAdding"></span>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    </main>

    <!--弹窗，可用于对话框、弹出式菜单等-->
    <!--弹出式菜单， 已单独拿出组件TPopup-->
    <div class="popup" style="left: 930px;top: 98px;display: none">
        <div class="popup-header">
            <span class="popup-title">Title</span>
            <a class="popup-header-close">
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

    <!--遮罩层-->
    <div class="window-overlay" style="display: none">
        <!--弹出式窗口-->
        <div class="popup">

            <div class="popup-header">
                <div class="popup-title">
                    <div class="popup-title-icon">
                        <span class="icon icon-card"></span>
                    </div>
                    <div class="popup-title-text">
                        <textarea class="form-field-input">平台规划</textarea>
                    </div>
                    <div class="popup-title-detail">
                        在列表 Done 中
                    </div>
                </div>
                <a class="popup-header-close">
                    <i class="icon icon-close"></i>
                </a>
            </div>

            <div class="popup-content">

                <!--描述-->
                <div class="window-module">

                    <div class="title">
                        <div class="title-icon">
                            <span class="icon icon-description"></span>
                        </div>
                        <div class="title-text">
                            <h3>描述</h3>
                            <button class="btn btn-edit">编辑</button>
                        </div>
                    </div>

                    <p class="description">
                        <textarea class="form-field-input">To Do</textarea>
                    </p>

                </div>

                <!--附件-->
                <div class="window-module">

                    <div class="title">
                        <div class="title-icon">
                            <i class="icon icon-attachment"></i>
                        </div>
                        <div class="title-text">
                            <h3>附件</h3>
                        </div>
                    </div>

                    <ul class="attachments">
                        <li class="attachment">
                            <div class="attachment-thumbnail" style="background-image: url('https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png')"></div>
                            <p class="attachment-detail">
                                <span class="attachment-thumbnail-name"><strong>icon_nav_button.png</strong></span>
                                <span class="attachment-thumbnail-descriptions">
                                <span class="datetime">2019年12月29日晚上11点04分</span>
                                <span> - </span>
                                <u>删除</u>
                            </span>
                                <span class="attachment-thumbnail-operation">
                                <i class="icon icon-card-cover"></i>
                                <u>移除封面</u>
                            </span>
                            </p>
                        </li>
                        <li class="attachment">
                            <div class="attachment-thumbnail" style="background-image: url('https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png')"></div>
                            <p class="attachment-detail">
                                <span class="attachment-thumbnail-name"><strong>icon_nav_button.png</strong></span>
                                <span class="attachment-thumbnail-descriptions">
                                <span class="datetime">2019年12月29日晚上11点04分</span>
                                <span> - </span>
                                <u>删除</u>
                            </span>
                                <span class="attachment-thumbnail-operation">
                                <i class="icon icon-card-cover"></i>
                                <u>移除封面</u>
                            </span>
                            </p>
                        </li>
                    </ul>

                    <div>
                        <button class="btn btn-edit">添加附件</button>
                    </div>

                </div>

                <!--活动-->
                <div class="window-module">

                    <div class="title">
                        <div class="title-icon">
                            <i class="icon icon-activity"></i>
                        </div>
                        <div class="title-text">
                            <h3>评论</h3>
                        </div>
                    </div>

                    <div class="comment-post">
                        <div class="avatar">
                            <span>Z</span>
                        </div>
                        <div class="comment-content-box editing">
                            <textarea class="comment-content-input" placeholder="添加评论……"></textarea>
                            <button class="btn btn-edit">保存</button>
                        </div>
                    </div>

                    <ul class="comments">
                        <li class="comment">
                            <div class="avatar">
                                <span>Z</span>
                            </div>
                            <div class="description">
                                <div class="header">
                                    <strong>zMouse</strong>
                                    <span> at </span>
                                    <i>2019年12月29日晚上11点04分</i>
                                </div>
                                <div class="content">
                                    非常不错！！
                                </div>
                            </div>
                        </li>
                        <li class="comment">
                            <div class="avatar">
                                <span>Z</span>
                            </div>
                            <div class="description">
                                <div class="header">
                                    <strong>zMouse</strong>
                                    <span> at </span>
                                    <i>2019年12月29日晚上11点04分</i>
                                </div>
                                <div class="content">
                                    非常不错！！
                                </div>
                            </div>
                        </li>
                        <li class="comment">
                            <div class="avatar">
                                <span>Z</span>
                            </div>
                            <div class="description">
                                <div class="header">
                                    <strong>zMouse</strong>
                                    <span> at </span>
                                    <i>2019年12月29日晚上11点04分</i>
                                </div>
                                <div class="content">
                                    非常不错！！
                                </div>
                            </div>
                        </li>
                        <li class="comment">
                            <div class="avatar">
                                <span>Z</span>
                            </div>
                            <div class="description">
                                <div class="header">
                                    <strong>zMouse</strong>
                                    <span> at </span>
                                    <i>2019年12月29日晚上11点04分</i>
                                </div>
                                <div class="content">
                                    非常不错！！
                                </div>
                            </div>
                        </li>
                        <li class="comment">
                            <div class="avatar">
                                <span>Z</span>
                            </div>
                            <div class="description">
                                <div class="header">
                                    <strong>zMouse</strong>
                                    <span> at </span>
                                    <i>2019年12月29日晚上11点04分</i>
                                </div>
                                <div class="content">
                                    非常不错！！
                                </div>
                            </div>
                        </li>
                        <li class="comment">
                            <div class="avatar">
                                <span>Z</span>
                            </div>
                            <div class="description">
                                <div class="header">
                                    <strong>zMouse</strong>
                                    <span> at </span>
                                    <i>2019年12月29日晚上11点04分</i>
                                </div>
                                <div class="content">
                                    非常不错！！
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div class="comment-pagination">
                        <div class="pagination">
                            <span>首页</span>
                            <span>上一页</span>
                            <span>...</span>
                            <span>4</span>
                            <span>5</span>
                            <span class="current-page">6</span>
                            <span>7</span>
                            <span>8</span>
                            <span>...</span>
                            <span>下一页</span>
                            <span>尾页</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>

  </div>
</template>
<script>
import THeader from '@/components/THeader.vue'
import TList from '@/components/TList.vue'
export default {
    name: 'Board',
    components: {
        THeader,
        TList
    },
    data(){
        return {
            listAdding: false,
        }
    },
    computed:{
        board(){ //获取当前登陆用户指定的一个看板详情
            // return this.$store.getters['board/getBoard'](this.$route.params.id)
        },
        lists(){
            // return this.$store.getters['list/getLists'](this.$route.params.id)
        }
    },
    created(){
        if(!this.board){ //获取一个面板
            // this.$route.dispatch('board/getBoard', this.$route.params.id)
        }
        if(this.lists && !this.lists.length){// 获取一个指定面板下的所有列表集合
            // this.$route.dispatch('list/getLists', this.$route.params.id)
        }
    },
    methods:{
        //添加一个列表
        showListAdding(){
            this.listAdding = true
            this.$nextTick(()=>{
                this.$refs.newListName.focus();
            })
        },
        //隐藏列表
        hiddenListAdding(){
            this.listAdding = false
        },
        //添加一个新的列表
        addNewList(){
            let name = this.$refs.newListName.value;
            console.log("addNewList-----", name)

            if (name.trim() === '') {
                this.$refs.newListName.focus();
            } else {
                try {
                    this.$store.dispatch('list/postList', {
                        boardId: this.board.id,
                        name
                    });

                    this.$message.success('提交成功');
                    this.$refs.newListName.value = '';
                    this.listAdding = true;
                } catch (e) {
                    console.log("catch---e---", e)
                }
            }
        },

        //拖拽相关事件
        //拖拽实现---两个list的位置互换！！！
        //实现的核心逻辑：【当前元素插入---到当前元素的前一个元素or后一个元素】元素存储的位置也会发生变化的！
        dragStart(e) {
            let el = e.component.$el;
            let board = el.parentNode;
            let lists = [...board.querySelectorAll('.list-wrap')];//获取列表集合
            el._index = lists.findIndex(list => list === el);//拖拽前-当前列表的位置记录_index
        },
        dragMove(e) { //列表组件拖拽交换位置！！！
            let el = e.component.$el;
            let board = el.parentNode;
            let lists = [...board.querySelectorAll('.list-wrap')];
            let currentIndex = lists.findIndex( list => list === el );

            lists.forEach( (list, index) => {
                if ( index !== currentIndex  ) {
                    let clientRect = list.getBoundingClientRect(); //获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
                    if (
                        e.x >= clientRect.left
                        &&
                        e.x <= clientRect.right
                        &&
                        e.y >= clientRect.top
                        &&
                        e.y <= clientRect.bottom
                    ) {
                        if (currentIndex < index) {
                            board.insertBefore(el, list.nextElementSibling);//当前列表的下一个列表前插入
                        } else {
                            board.insertBefore(el, list);//当前列表前插入
                        }
                    }
                }
            } );
        },
        async dragEnd(e) {

            let el = e.component.$el; //拿到元素
            let board = el.parentNode;//父级节点
            //注意：TList子组件list-wrap同级，增加list-wrap-content属性，为了计算lists列表的总数【不包含--添加另一个列表模块】
            let lists = [...board.querySelectorAll('.list-wrap-content')];
            let currentIndex = lists.findIndex(list => list === el);
            console.log("dragEnd______board", board)

            // 判断一下当前这个元素是否移动了
            // console.log(el._index, currentIndex);
            if (el._index !== currentIndex) {
            //元素移动逻辑处理如下：
                let newOrder;//定义最新的order值

                // 1、TList子组件中class="list-wrap" 增加:data-order="data.order"属性操作
                // 获取当前所在位置的上一个列表和下一个列表的order值
                let prevOrder = lists[currentIndex - 1] && parseFloat( lists[currentIndex - 1].dataset.order );
                let nextOrder = lists[currentIndex + 1] && parseFloat( lists[currentIndex + 1].dataset.order );
                // console.log(prevOrder, nextOrder);

                if (currentIndex === 0) {
                    newOrder = nextOrder / 2;
                } else if (currentIndex === lists.length - 1) {
                    newOrder = prevOrder + 65535;
                } else {
                    newOrder = prevOrder + (nextOrder - prevOrder) / 2;//下一个 减 前一个 除以2 取得差值；
                }
                console.log("dragEnd______newOrder", newOrder)

                await this.$store.dispatch('list/editList', {
                    boardId: this.board.id,
                    id: e.component.data.id, //当前对象元素的属性
                    order: newOrder
                })

            }

        }
    }
}
</script>

<style>

</style>
