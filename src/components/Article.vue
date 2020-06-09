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
  import $ from '../libs/util'
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
/*
      extractHostname: function (url) {
        var hostname
        // find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf('//') > -1) {
          hostname = url.split('/')[2]
        }
        else {
          hostname = url.split('/')[0]
        }

        // find & remove port number
        hostname = hostname.split(':')[0]
        // find & remove "?"
        hostname = hostname.split('?')[0]

        return hostname
      },

      getArticle: function () {
        $.ajax.get('news/' + this.id).then(res => {
          res.body = res.body
            .replace(/src="http/g, 'src="' + $.imgPath + 'http')
          res.body = res.body
            .replace(/src="https/g, 'src="' + $.imgPath + 'https')

          var imgHostName = this.extractHostname(res.image).split('.')[0]
          if (imgHostName === 'pic3') {
            res.image = $.imgPath + res.image
          }
          // console.log(imgHostName);

          this.data = res
          window.scrollTo(0, 0)
        })
      },
      asyncGetArticle: async function () {
        const response = await $.ajax.get('news/' + this.id)
        response.body = response.body.replace(/src="http/g, 'src="' + $.imgPath + 'http')
        response.body = response.body.replace(/src="https/g, 'src="' + $.imgPath + 'https')

        var imgHostName = this.extractHostname(response.image).split('.')[0]
        if (imgHostName === 'pic3') {
          response.image = $.imgPath + response.image
        }
        this.data = response
        window.scrollTo(0, 0)
      },
      */
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
