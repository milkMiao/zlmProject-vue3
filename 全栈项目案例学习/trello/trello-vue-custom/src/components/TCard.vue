<template>
    <router-link :to="{name: 'Card', params:{listId: card.boardListId, cardId: card.id}}" v-if="card">
        <div class="list-card">
            <div class="list-card-cover" :style="'background-image: url('+card.coverPath+');'"></div>
            <div class="list-card-title">{{card.name}}</div>
            <div class="list-card-badges">
                <div class="badge" v-if="card.description"><!-- 简介 -->
                    <span class="icon icon-description"></span>
                </div>
                <div class="badge" v-if="card.commentCount >0"><!-- 评论 -->
                    <span class="icon icon-comment"></span>
                    <span class="text">{{card.commentCount}}</span>
                </div>
                <div class="badge" v-if="Array.isArray(card.attachments) && card.attachments.length >0"><!-- 附件 -->
                    <span class="icon icon-attachment"></span>
                    <span class="text">{{card.attachments.length}}</span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'TCard',
    props: {
        card: {
            type: Object,
            default: () => ({})
        }
    },
}
</script>

<style>

</style>