<template>
  <div id="app">
    <v-menu title="menu"></v-menu>
    <vueper-slides autoplay>
      <vueper-slide v-for="(slide, i) in slides" :key="i" :title="slide.title" :content="slide.hint"
                     :image="slide.image" @click.native="handleClick(slide.id)" />
    </vueper-slides>
    <div class="container">
      <v-news-item-list title="itemlist" :recommendationList="recommendationList" v-on:scroll="OnItemListScroll"
                        v-on:MSG_SEL_CHANGE="OnItemListSelChg" ref="list"></v-news-item-list>
      <daily-article :id="articleId"></daily-article>
    </div>
  </div>
</template>

<script>
  // import component
  import { VueperSlides, VueperSlide } from 'vueperslides'
  import 'vueperslides/dist/vueperslides.css'
  import vMenu from './components/Menu.vue'
  import vNewsItemList from './components/ItemList.vue'
  import dailyArticle from './components/Article.vue'
  import $ from './libs/util'
  import { asyncGetLastNews, asyncGetNewsBeforeDate, translateArrayImgUrl } from './api/article'

  export default {
    data: function () {
      return {
        themes: [],
        showThemes: false,
        type: 'recommend',
        recommendationList: [],
        dailyTime: $.getTodayTime() + $.MILLISECONDS_PER_DAY,
        list: [],
        themeId: 0,
        articleId: 0,
        isLoading: false,
        slides: [

        ]
      }
    },
    components: {
      VueperSlides,
      VueperSlide,
      vMenu,
      vNewsItemList,
      dailyArticle
    },
    methods: {
      OnItemListSelChg: function (iNewSel, iOldSel) {
        this.articleId = iNewSel
      },
      /*
      handleToRecommend () {
        this.type = 'recommend'
        this.recommendationList = []
        this.dailyTime = $.getTodayTime()
        this.getRecommendationList()
      },
      */
      asyncGetLastNews: async function () {
        this.isLoading = true
        const data = await asyncGetLastNews()
        this.recommendationList.push(data)
        translateArrayImgUrl(data.top_stories)
        this.slides.push.apply(this.slides, data.top_stories)
        console.log(this.slides)
        this.isLoading = false
      },
      asyncGetNews: async function () {
        this.isLoading = true
        const date = $.prevDay(this.dailyTime)
        const data = await asyncGetNewsBeforeDate(date)
        this.recommendationList.push(data)
        this.isLoading = false
      },
      OnItemListScroll: function () {
        if (this.isLoading) {
          return
        }
        const list = this.$refs.list.$el

        if (list.scrollTop + document.body.clientHeight >= list.scrollHeight - 5) {
          this.dailyTime -= $.MILLISECONDS_PER_DAY
          this.asyncGetNews()
        }
      },
      handleClick: function (id) {
        if (id !== this.articleId) {
          var iOldSel = this.articleId
          this.articleId = id

          var oldElItems = this.$refs.list.getElementsByClassName('daily-item').namedItem(iOldSel)
          var newElItems = this.$refs.list.getElementsByClassName('daily-item').namedItem(this.articleId)

          if (oldElItems) {
            oldElItems.classList.remove('active')
          }
          if (newElItems) {
            newElItems.classList.add('active')
          }
          // $emit 方法触发父组件的监听事件
          this.$emit('MSG_SEL_CHANGE', this.articleId, iOldSel)
        }
      }
    },
    mounted: async function () {
      // Load the daily recommended lists during app initialization
      // this.asyncGethotNews()
      this.asyncGetLastNews()
      // this.asyncGetNews()
    }
  }
</script>

<style>
  html,
  body,
  ul {
    margin: 0;
    padding: 0;
    height: 100%;
    color: #657180;
    font-size: 16px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  / / text-align: center;
    color: #2c3e50;
  / / margin-top: 60 px;
  }
  .vueperslides {
    background-color: rgba(0, 0, 0, 0.3);
    transition: 0.3s;
    margin-left: 150px;
    width: 960px;
  }
  .vueperslides .default {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .vueperslides__bullet .default {
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    box-shadow: none;
    transition: 0.3s;
    width: 16px;
    height: 16px;
  }
  .vueperslides__bullet--active .default {background-color: #42b983;}

  .vueperslides__bullet span {
    display: block;
    color: #fff;
    font-size: 10px;
    opacity: 0.8;
  }

  .container {
    position: relative;
  }
</style>
