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
        //recommendationList: [],
        /*
        list: [
            ///////////
            {
                image_hue: "0x454230",
                title: "抑郁症患者如何自我疗愈？",
                url: "https:\/\/daily.zhihu.com\/story\/9720558",
                hint: "海木生 · 48 分钟阅读",
                ga_prefix: "021916",
                images: ["https:\/\/pic3.zhimg.com\/v2-d296c6b43767d5e8d0544774d442d29a.jpg"],
                type: 0,
                id: 9720558
            }, {
                image_hue: "0x2592b3",
                title: "新冠肺炎对中国的积极意义是什么？",
                url: "https:\/\/daily.zhihu.com\/story\/9720553",
                hint: "KellyWeaver · 3 分钟阅读",
                ga_prefix: "021911",
                images: ["https:\/\/pic1.zhimg.com\/v2-040d7ec50e52fd9f77afa3b7370cd32c.jpg"],
                type: 0,
                id: 9720553
            }, {
                image_hue: "0x9db37d",
                title: "为什么有的人很聪明，大脑结构有什么不一样吗？",
                url: "https:\/\/daily.zhihu.com\/story\/9720543",
                hint: "莫神筋 · 5 分钟阅读",
                ga_prefix: "021909",
                images: ["https:\/\/pic4.zhimg.com\/v2-131c17f7f2111f8843fb8954b0ca5e67.jpg"],
                type: 0,
                id: 9720543
            }, {
                image_hue: "0x917343",
                title: "CCTV-7《致富经》的成功可以复制吗？",
                url: "https:\/\/daily.zhihu.com\/story\/9720534",
                hint: "弹吉他的胖达 · 2 分钟阅读",
                ga_prefix: "021907",
                images: ["https:\/\/pic2.zhimg.com\/v2-04df5028f5b7f7e7b0f5f6f360559e49.jpg"],
                type: 0,
                id: 9720534
            }, {
                image_hue: "0x86b37d",
                title: "瞎扯 · 如何正确地吐槽",
                url: "https:\/\/daily.zhihu.com\/story\/9720526",
                hint: "VOL.2334",
                ga_prefix: "021906",
                images: ["https:\/\/pic3.zhimg.com\/v2-b5328abc1a941c4b84265f5cc10f95d6.jpg"],
                type: 0,
                id: 9720526
            }
            //////////////
        ],
        */
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
    width: 310px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 150px;
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
