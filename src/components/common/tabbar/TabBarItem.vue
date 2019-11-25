<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor:{
        type:String,
        default:'red'
    }
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
    }
  },
  methods: {
    itemClick() {
      // console.log('hh')
      this.$router.push(this.path);
    }
  }
};
</script>
<style scoped>
.tab-bar-item {
  /* 按1：1均等分布 */
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 元素放在父元素的中部,图片下方会有3px的空白，可以使用该样式去除 */
  vertical-align: middle;
}
</style>