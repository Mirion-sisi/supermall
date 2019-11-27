<template>
  <div class="goodsList-item" @click="itemClick">
    <img v-lazy="showImage" alt @load="itemImageLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">价格:{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template> 
<script>
export default {
    name:'GoodsListItem',
    props:{
        goodsItem:Object,
        default(){
            return {}
        }
    },
    created() {
      // console.log(this.goodsItem)
    },
    computed: {
      showImage(){
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      },
      shopId(){
        return this.goodsItem.iid || this.goodsItem.shop_id
      }
    },
    methods: {
         //vue监听图片加载完 @load;原生js是img.onload=function(){}
    itemImageLoad(){
        //全局的$bus，哪里都可以引用
      this.$bus.$emit('itemImageLoad');
    },
    itemClick(){
      // this.$router.push('/detail')
    this.$router.push({
    path:'/detail',
    query:{
      iid:this.shopId
    }
  })
  }
    }
}
</script>
<style scoped>
.goodsList-item {
  /* text-align: center; */
  padding-bottom: 40px;
  position: relative;
}
.goodsList-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  position: absolute;
  font-size: 12px;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
  overflow: hidden;
}
.goods-info p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>