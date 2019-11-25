<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 在Vue中明确的拿到某个元素，需要给元素绑定ref属性
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 监听实时的位置,但不一定所有的托管对象都需要，所以不能将probeType设置死
      probeType: this.probeType,
      // 上拉加载更多
      pullUpLoad: this.pullUpLoad,
      // 设置了这个属性后，被BScroll托管的元素才能实现click监听事件,默认是false
      click: true
    });
    // 实时滚动的位置。等到了一定值时，让返回顶部的图标显示
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }

    // 实现下拉加载更多
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("下拉加载更多！");
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // scroll中有一个返回顶部的方法,ES6的写法，time=300，默认等于300
    scrollTo(x, y, time = 300) {
      //  x,y代表坐标，time代表动画时间，easing表示缓动函数
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 上拉加载更多默认只能执行一次，需要执行下面方法就可以加载多次
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    // 刷新 将scrollHeight的值刷新
    refresh() {
      console.log("----");
      this.scroll && this.scroll.refresh();
    },
    // 获取scroll的y位置
    getScrollY() {
      // console.log('调用了几次')
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>
<style scoped>
</style>