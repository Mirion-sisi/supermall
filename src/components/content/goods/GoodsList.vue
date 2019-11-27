<template>
  <div class="goodsList">
    <goods-list-item 
    class="item" 
    v-for="(item,index) in goodsList" 
    :key="index" 
    :goodsItem="item"

    ></goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  props:{
      goodsList:{
          type:Array,
          default(){
              return []
          }
      }
  },  
  data() {
    return {
      
    };
  },
  created() {
    console.log(this.goodsList)
  },
  mounted() {
    console.log(this.goodsList)
  },
  updated() {
     console.log(this.goodsList)
  },
  methods: {
   
  },
  components: {
    GoodsListItem
  }
};
</script>
<style scoped>
.goodsList {
  display: flex;
  /* 是否换行，换行 */
  flex-wrap: wrap;
  padding: 5px;
  justify-content: space-around;
}
.goodsList .item{
    width: 48%;
}
</style>