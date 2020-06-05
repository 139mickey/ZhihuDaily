<template>
  <div id="app">
    <v-menu title="menu"></v-menu>
    <v-news-item-list title="itemlist" :recommendationList="recommendationList" v-on:scroll="OnItemListScroll"
                      v-on:MSG_SEL_CHANGE="OnItemListSelChg" ref="list"></v-news-item-list>
    <daily-article :id="articleId"></daily-article>
  </div>
</template>

<script>
  // import component
  import vMenu from './components/Menu.vue'
  import vNewsItemList from './components/ItemList.vue'
  import dailyArticle from './components/Article.vue'
  import $ from './libs/util'
  import { asyncGetRecommendationList } from './api/article'

  export default {
    data: function () {
      return {
        themes: [],
        showThemes: false,
        type: 'recommend',
        recommendationList: [],
        dailyTime: $.getTodayTime(),
        list: [],
        themeId: 0,
        articleId: 0,
        isLoading: false
      }
    },
    components: {
      vMenu,
      vNewsItemList,
      dailyArticle
    },
    methods: {
      OnItemListSelChg: function (iNewSel, iOldSel) {
        this.articleId = iNewSel
      },
      handleToRecommend () {
        this.type = 'recommend'
        this.recommendationList = []
        this.dailyTime = $.getTodayTime()
        this.getRecommendationList()
      },
      getRecommendationList: function () {
        this.isLoading = true
        const prevDay = $.prevDay(this.dailyTime)
        $.ajax.get('news/before/' + prevDay).then(res => {
          this.recommendationList.push(res)
          this.isLoading = false
        })
      },
      asyncGetRecommendationList: async function () {
        const prevDay = $.prevDay(this.dailyTime + $.MILLISECONDS_PER_DAY)
        try {
          const response = await $.ajax.get('news/before/' + prevDay)
          this.recommendationList.push(response)
          this.isLoading = false
        } catch (e) {
          // TODO handle the exception
          this.isLoading = true
          console.error(e)
        }
      },
      initialRecommendationList: function (data) {
        this.recommendationList.push(data)
      },
      OnItemListScroll: function () {
        if (this.isLoading)
          return
        const list = this.$refs.list.$el
        // console.log(list);

        if (list.scrollTop + document.body.clientHeight >= list.scrollHeight) {
          this.dailyTime -= 86400000
          this.getRecommendationList()
        }
        // console.log("in app.vue itemlist scroll.");
      }
    },
    mounted: async function () {
      // Load the daily recommended lists during app initialization
      // this.getRecommendationList()
      // this.asyncGetRecommendationList()
      const data = await asyncGetRecommendationList()
      this.initialRecommendationList(data)
      // console.log(data)
      // const $list = this.$refs.list
      // console.log($list);
      /*
      $list.$on('scroll', () => {
          if (this.isLoading)
              return;

          if ($list.scrollTop + document.body.clientHeight >= $list.scrollHeight) {
              this.dailyTime -= 86400000;
              this.getRecommendationList();
          }
      });
*/
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
    margin-top: 60px;
  }
</style>
