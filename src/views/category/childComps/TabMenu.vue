<template>
  <div class="tab-menu">
    <div
      class="tab-menu-item"
      @click="clickItem(index,item)"
      :class="{active:isActive===index}"
      v-for="(item,index) in categories"
      :key="index"
    >{{item.title}}</div>
  </div>
</template>
<script>
export default {
  name: "TabMenu",
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isActive: 0
    };
  },
  created() {},
  methods: {
      clickItem(index,item){
          this.isActive=index
         
          this.$emit('selectItem',index)
      }
  }
};
</script>
<style scoped>
.tab-menu {
  height: 100%;
  width: 100px;
  box-sizing: border-box;
}
.tab-menu-item {
  padding: 6px 0;
  text-align: center;
  font-size: 14px;
  border: 1px solid #ccc;
}
.active {
  background-color: var(--color-tint);
  color: #fff;
}
</style>