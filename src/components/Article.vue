<template>
  <div class="daily-article">
    <img :src="data.image">
    <div class="daily-article-title">{{ data.title }}</div>
    <div class="daily-article-content" v-html="data.body"></div>
    <v-news-comment :news_id="id"></v-news-comment>
  </div>
</template>

<script>
  import Time from '../libs/time'
  import vNewsComment from './Comment.vue'
  import { asyncGetArticle } from '../api/article'

  export default {
    directives: {Time},
    components: {
      vNewsComment
    },
    props: {
      id: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      return {
        data: {},
        comments: []
      }
    },
    methods: {
    },
    watch: {
      id: async function (val) {
        if (val) {
          // this.asyncGetArticle()
          this.data = await asyncGetArticle(this.id)
        }
      }
    }
  }
</script>

<style>
  .daily-article {
    width: 640px;
    margin-left: 450px;
    padding: 20px;
  }
  .daily-article figure{
    margin: 0px;
    padding:0px;
  }
  .daily-article img {
    max-width: 640px;
    height: auto;
  }
  .daily-article-title {
    font-size: 28px;
    font-weight: bold;
    color: #222;
    padding: 10px 0;
  }

  .view-more a {
    display: block;
    cursor: pointer;
    background: #f5f7f9;
    text-align: center;
    color: inherit;
    text-decoration: none;
    padding: 4px 0;
    border-radius: 3px;
  }
</style>
