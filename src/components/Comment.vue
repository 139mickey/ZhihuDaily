<template>
    <div class="daily-comments" v-show="comments.length">
        <span>评论（{{ comments.length }}）</span>
        <div class="daily-comment" v-for="comment in comments">
            <div class="daily-comment-avatar">
                <img :src="comment.avatar">
            </div>
            <div class="daily-comment-content">
                <div class="daily-comment-name">{{ comment.author }}</div>
                <div class="daily-comment-time" v-time="comment.time"></div>
                <div class="daily-comment-text">{{ comment.content }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Time from '../libs/time';
    import $ from '../libs/util';
    export default {
        name: 'v-news-comment',
        directives: { Time },
        props: {
            news_id: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                comments: []
            }
        },
        methods: {
            getComments () {
                this.comments = [];
                if (this.news_id > 0) {
                    $.ajax.get('story/' + this.news_id + '/short-comments').then(res => {
                        this.comments = res.comments.map(comment => {
                            // 将头像的图片地址转为代理地址
                            comment.avatar = $.imgPath + comment.avatar;
                            return comment;
                        });
                    })
                }
            }
        },
        mounted() {
           this.getComments();
        },
        watch: {
            news_id(val) {
                if (val) this.getComments();
            }
        }
    }
</script>

<style>
    .daily-comments {
        margin: 10px 0;
    }

    .daily-comments span {
        display: block;
        margin: 10px 0;
        font-size: 20px;
    }

    .daily-comment {
        overflow: hidden;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px dashed #e3e8ee;
    }

    .daily-comment-avatar {
        width: 50px;
        height: 50px;
        float: left;
    }

    .daily-comment-avatar img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
    }

    .daily-comment-content {
        margin-left: 65px;
    }

    .daily-comment-name {}

    .daily-comment-time {
        color: #9ea7b4;
        font-size: 14px;
        margin-top: 5px;
    }

    .daily-comment-text {
        margin-top: 10px;
    }
</style>
