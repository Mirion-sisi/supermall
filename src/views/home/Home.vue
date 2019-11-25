<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>蘑菇街</div>
      </template>
    </nav-bar>
    <tab-control
      v-show="isTabFixed"
      ref="tabControl1"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
    ></tab-control>
    <scroll
      class="wrapper"
      ref="scroll"
      :probe-type="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="loadingMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goodsList="showGoods"></goods-list>
    </scroll>
    <!-- 组件不能直接调用click点击事件,需要加上native关键字才生效 -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
// @ is an alias to /src

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

import { getHomeMultidata, getHomeGoodsdata } from "network/home";


import {itemListenerMixin,backTop} from 'common/mixin.js'


export default {
  name: "home",
  data() {
    return {
      result: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    
    };
  },
  mixins:[itemListenerMixin,backTop],
  created() {
    this.getHomeMultidata();
    this.getHomeGoodsdata("pop");
    this.getHomeGoodsdata("new");
    this.getHomeGoodsdata("sell");
  },
  mounted() {
  
  },
  activated() {
    console.log(this.saveY)
    this.$refs.scroll.scrollTo(0, this.saveY);
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.保存Y值，我们离开时的位置
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY)
    // 2.取消全局事件监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    // 1.事件监听的方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 1.backTop按钮的显示和隐藏
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
      // console.log(-position.y);
    },
    // 下拉加载更多
    loadingMore() {
      // console.log('上拉加载！')
      this.getHomeGoodsdata(this.currentType);

      // 避免出现上拉不滚动的情况，需要调用以下方法；
      //因为better-scroll他会在加载的最初设置可滑动的高度，BS所设的滑动高度不会更改，开始的时候照片还没完全加载完成，高度不能撑开，
      // 到图片加载完成过后，滑动高度实际更大，所以就会出现下面的部分不能滑上来的情况
      // this.$refs.scroll.scroll.refresh();
    },

    //.获取tabControl的offsetTop,在此时获取的offsetTop可能不准确，因为图片不一定都加载完成了，应该监听轮播图的加载
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    },
    // 2网络请求相关的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    // 请求goods列表
    getHomeGoodsdata(type) {
      const page = this.goods[type].page;
      getHomeGoodsdata(type, page).then(res => {
        // 请求的新数据，添加到后面
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  }
};
</script>
<style scoped>
#home {
  /* vh=viewport height视口的高度；设置局部滚动必须给父元素设置明确的高度 */
  height: 100vh;
  position: relative;
  /* padding-top: 44px; */
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 在使用浏览器原生滚动是，为了让导航不跟随一起滚动；现在使用better-scroll局部滚动，所以不需要了 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
}

/* 吸顶效果 */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
/* 设置局部滑动区域的高度 */
/* 第一种方法：动态设置高度 ，给#home设置高度*/
/* .wrapper{
  margin-top: 44px;
  height: calc(100% - 93px);
  background-color: yellow;
  overflow: hidden;
} */
/* 第二种方法：设置绝对定位 ,给#home设置relative定位*/
.wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* background-color: yellow; */
  overflow: hidden;
}
</style>
