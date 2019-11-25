<template>
  <div id="detail">
    <detail-nav-bar ref='detailNav' class="detail-top-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="wrapper" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper ref="swiper" :images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="detailImageLoad"></detail-goods-info>
      <detail-params-info ref="params" :params-info="paramsInfo"></detail-params-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods-list="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart='addToCart'></detail-bottom-bar>
    
  </div>
</template>
<script>

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";


import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar'

import { getDetail, Goods, Shop, getRecommend } from "network/detail";

import { debounce } from "common/utils.js";
import { itemListenerMixin ,backTop } from "common/mixin.js";

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: [],
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex:0,

     
    };
  },
  mixins: [itemListenerMixin,backTop],
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.query.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 2.1获取顶部轮播图的详情数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      console.log(this.topImages);
      // 2.2.获取商品的信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 2.3 获取商家信息
      this.shop = new Shop(data.shopInfo);
      // 2.4 商品详情
      this.detailInfo = data.detailInfo;
      // 2.5 参数信息
      this.paramsInfo = data.itemParams;
      // 2.6 评论的信息
      this.commentInfo = data.rate.list;
    });
    // 3.获取推荐数据
    getRecommend().then(res => {
      this.recommend = res.data.list;
      // console.log(res)
    });
    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(this.$refs.swiper.$el.offsetTop);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
     ...mapActions({
        addCart: 'addToCart'
      }),
    detailImageLoad() {
      // this.$refs.scroll.refresh()
      // 当详情页的推荐部分的照片加载完成后，调用下面的方法给

      this.getThemeTopY();
    },
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index]);
    },
    // 根据内容的滑动控制tab的高亮显示
    contentScroll(position) {
       // backTop按钮的显示和隐藏
      this.isShowBackTop = -position.y > 1000;
      // 1.获取y值
      const positionY = -position.y;
      // 2.positionY和themeTopYs中值进行对比
      // [0,7938,9120,9452]
      // positionY 在=0和7938之间  index=0
      // positionY 在=7938和9120之间  index=1
      // positionY 在=9120和9452之间  index=2

      // positionY 在 >=9452  index=3
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {

        // 1.普通做法
        // 条件成立的话：this.currentIndex=i;
        // 条件一： this.currentIndex!==i 防止赋值的过程过于频繁
        // 条件二:  
                // 条件1:(i<length-1 && positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i + 1])
                // * 判断区间:在0和某个数字之间(i<length-1)
                // 条件2:(i===length-1 && positionY >= this.themeTopYs[i])
                // *判断大于等于:i===length-1 
        // if (
        //   this.currentIndex!==i &&
        //  (
        //    (i<length-1 && positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i + 1])
        //     || (i===length-1 && positionY >= this.themeTopYs[i])
        //   )
        // ) {
        //   this.currentIndex=i;
        //   this.$refs.detailNav.currentIndex=this.currentIndex
        // }

        // 2.hack做法:给themeTopYs最后加一个值Number.MAX_VALUE那么我们就不用判断i<length-1
         if (
          this.currentIndex!==i && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i + 1])
            ) {
          this.currentIndex=i;
          this.$refs.detailNav.currentIndex=this.currentIndex
        }
      }
    },
    addToCart(){
      // console.log(this.$store.state.cartList)
     // 2.将商品信息添加到Store中
        const obj = {}
        obj.iid = this.iid
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc
        obj.price = this.goods.realPrice
        obj.isCheck=true
        // 1.普通写法
        // this.$store.dispatch('addToCart', obj)
        // 2.mapActions函数的写法
        this.addCart(obj).then(res=>{
          this.$toast.show(res,1500)

        })
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  }
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-top-nav {
  /* position: relative; */
  background-color: #fff;
  /* z-index: 9; */
}
.wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>