<template>
  <div>
    <nav-bar>
        <template v-slot:left>
            <div class="back" @click="backClick">
                <img src="../../../assets/img/common/back.svg" alt="">
            </div>
        </template>
      <template v-slot:center>
        <div class="navbar">
          <div
            class="navbar-item"
            v-for="(item,index) in titles"
            :key="item"
            :class="{active:currentIndex===index}"
            @click="titleClick(index)"
          >{{item}}</div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  created() {},
  components: {
    NavBar
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    backClick(){
        this.$router.back()
    }
  }
};
</script>
<style scoped>
.navbar {
  display: flex;
}
.navbar-item {
  flex: 1;
  font-size: 14px;
}
.active {
  color: var(--color-tint);
}
.back img{
    margin-top: 10px;
}
</style>