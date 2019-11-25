<template>
  <div class="cart-list">
    <scroll class="wrapper" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>
<script>
import Scroll from "../../../components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";
export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
      this.$refs.scroll.refresh()
  },
  components: {
    Scroll,
    CartListItem
  }
};
</script>
<style scoped>
.cart-list {
}
.wrapper {
  position: absolute;
  top: 44px;
  bottom: 89px;
  right: 0;
  left: 0;
  overflow: hidden;
}
</style>