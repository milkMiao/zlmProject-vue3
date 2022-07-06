<template>
    <div class="window-overlay" style="display: block" v-if="card && list">
        <!--弹出式窗口-->
        <div class="popup">

            <div class="popup-header">
                <div class="popup-title">
                    <div class="popup-title-icon">
                        <span class="icon icon-card"></span>
                    </div>
                    <div class="popup-title-text">
                        <textarea class="form-field-input" @blur="editCardName">{{card.name}}</textarea>
                    </div>
                    <div class="popup-title-detail">
                        在列表 {{list.name}} 中
                    </div>
                </div>
                <a class="popup-header-close">
                    <i class="icon icon-close" @click="$router.back()"></i>
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
                        <textarea class="form-field-input" @blur="editCardDescription">{{card.description}}</textarea>
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

                    <ul class="attachments" v-if="Array.isArray(card.attachments)">
                        <li class="attachment" v-for="attachment of card.attachments" :key="attachment.id">
                            <div class="attachment-thumbnail" :style="`background-image: url(${server.staticPath}${attachment.path})`"></div>
                            <p class="attachment-detail">
                                <span class="attachment-thumbnail-name"><strong>{{attachment.detail.name}}</strong></span>
                                <span class="attachment-thumbnail-descriptions">
                                    <span class="datetime">
                                        {{attachment.createdAt|dateTime}}
                                    </span>
                                    <span> - </span>
                                    <u @click="removeAttachment(attachment.id)">删除</u>
                                </span>
                                <span class="attachment-thumbnail-operation">
                                    <i class="icon icon-card-cover"></i>
                                    <u v-if="attachment.isCover" @click="removeCover(attachment.id)">移除封面</u>
                                    <u v-else @click="setCover(attachment.id)">设为封面</u>
                                </span>
                            </p>
                        </li>
                    </ul>

                    <div>
                        <button class="btn btn-edit" @click="$refs.attachment.click()">添加附件</button>
                        <input type="file" ref="attachment" style="display: none" @change="uploadAttachment">
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

                    <t-comment :card-id="card.id"></t-comment>

                </div>

            </div>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Card',
  components: {
    // HelloWorld
  }
}
</script>