<template>
  <div class="daily-list" ref="list" v-on:scroll="OnItemListScroll" @mousewheel="OnItemListScroll">
    <!-- h1>Item list</h1 -->
    <template v-if="type === 'recommendation'">
      <div v-for="recommendation in recommendationList">
        <div class="daily-date">{{ formatDay(recommendation.date) }}</div>
        <!--Item 组件 -->
        <v-news-item v-for="story in recommendation.stories" :data="story" :key="story.id"
                     @click.native="handleClick(story.id)"></v-news-item>
      </div>
    </template>
  </div>
</template>

<script>
  import vNewsItem from './NewsItem.vue'

  export default {
    name: 'v-itemlist',
    props: {
      recommendationList: {
        type: Array,
        default: []
      }
    },
    data: function () {
      return {
        currentSelIndex: 0,
        articleId: 0,
        isLoading: false,
        type: 'recommendation',
        date: '20200219',
        msg: 'In ItemList Componement'
      }
    },
    components: {
      vNewsItem
    },
    methods: {
      OnItemListScroll: function (event) {
        this.$emit('scroll', event)
      },
      formatDay: function (date) {
        let month = date.substr(4, 2)
        let day = date.substr(6, 2)
        if (month.substr(0, 1) === '0') month = month.substr(1, 1)
        if (day.substr(0, 1) === '0') day = day.substr(1, 1)
        return `${month} 月 ${day} 日`
      },
      handleClick: function (id) {
        if (id !== this.articleId) {
          var iOldSel = this.articleId
          this.articleId = id

          var old_elItems = this.$refs.list.getElementsByClassName('daily-item').namedItem(iOldSel)
          var new_elItems = this.$refs.list.getElementsByClassName('daily-item').namedItem(this.articleId)

          if (old_elItems)
            old_elItems.classList.remove('active')
          if (new_elItems)
            new_elItems.classList.add('active')

          // $emit 方法触发父组件的监听事件
          this.$emit('MSG_SEL_CHANGE', this.articleId, iOldSel)
        }
      },
    },
    mounted: function () {
      // console.log("in ItemList component mounted function.", this.recommendationList);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .daily-list {
    position: absolute;
    margin-top: 10px;
    top: 0;
    bottom: 0;
    left: 150px;
    width: 310px;
    height:700px;
    overflow: auto;
    border-right: 1px solid #d7dde4;
  }

  .daily-date {
    text-align: center;
    margin: 10px 0;
    background-color: #9fdbe4;
  / / border-bottom: 2 px solid #9fdbe4;
  }
</style>
