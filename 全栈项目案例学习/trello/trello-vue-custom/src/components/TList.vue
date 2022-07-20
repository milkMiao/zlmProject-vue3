<!--面板列表容器-->
<template>
    <div class="list-wrap" :class="{ 'list-adding':true }">
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
                    <div class="list-card-cover"
                            style="background-image: url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png);"></div>
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

                <div class="list-card">
                    <div class="list-card-cover"
                            style="background-image: url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png);"></div>
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

                <div class="list-card">
                    <div class="list-card-cover"
                            style="background-image: url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png);"></div>
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

                <div class="list-card">
                    <div class="list-card-cover"
                            style="background-image: url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png);"></div>
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

                <div class="list-card">
                    <div class="list-card-cover"
                            style="background-image: url(https://trello-attachments.s3.amazonaws.com/5ddf961b5e861107e5f2de49/200x200/96d8fa19e335be20c102d394ef4bed71/logo.png);"></div>
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
</template>

<script>
export default {
    name: 'TList',
    
}
</script>

<style>

</style>