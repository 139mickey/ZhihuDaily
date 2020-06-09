<template>
    <a class="daily-item" :id="data.id">
        <div class="daily-img" v-if="data.images">
            <img :src="imgPath + data.images[0]">
        </div>
        <div class="daily-title" :class="{ noImg: !data.images}">{{ data.title }}</div>
        <div class="daily-author" :class="{ noImg: !data.images}">{{ data.hint }}</div>
    </a>
</template>

<script>
    import $ from '../libs/util';

    export default {
        name: 'v-news-item',
        props: {
            data: {
                type: Object
            }
        },
        data () {
            return {
                imgPath: $.imgPath
            }
        }
    }
</script>

<style scoped>
    .daily-item {
        display: block;
        color: inherit;
        text-decoration: none;
        padding: 16px;
        overflow: hidden;
        cursor: pointer;
        border-right: 2px solid transparent;
        transition: all .3s ease-in-out;
    }

    .active {
        background: #e3e8ee;
        border-right: 2px solid #3399ff;
    }

    .daily-item:hover {
        background: #e3e8ee;
        border-right: 2px solid #3399ff;
    }

    .daily-img {
        width: 90px;
        height: 90px;
        float: left;
    }

    .daily-img img {
        width: 100%;
        height: 100%;
        border-radius: 3px;
    }

    .daily-title {
        padding: 10px 5px 5px 100px;
    }

    .daily-author {
        font-size: 14px;
        padding: 10px 5px 5px 100px;
    }

    .daily-title.noImg {
        padding-left: 5px;
    }
</style>
