<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <div class="check-button">
        <check-button @click.native="checkClick" :isCheck='isSelectAll'></check-button>
      </div>
      <div class="check-title">全选</div>
      <div class="total-price">合计:￥{{totalPrice}}</div>
    </div>
    <div class="calculate" @click="calcClick">去计算({{checkLength}})</div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  computed: {
    //   总价
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => {
          return item.isCheck;
        })
        .reduce((preValue, item) => {
          return preValue + item.count * item.price;
        }, 0)
        .toFixed(2);
    },
    // 结算的总件数
    checkLength(){
        return this.$store.state.cartList.filter(item=>item.isCheck).length
    },
    // 是否全选
    isSelectAll(){
        if(this.$store.state.cartList.length==0) return false
       return  !this.$store.state.cartList.some(item=>!item.isCheck)
    }
  },
  methods: {
     checkClick(){
         if(this.isSelectAll){
               this.$store.state.cartList.forEach(item=>item.isCheck=false);
         }else{
             this.$store.state.cartList.forEach(item=>item.isCheck=true);
         }
       
     },
     calcClick(){
       if(!this.isSelectAll){
         this.$toast.show('请选择购买的商品',2000)
       }
     }
  },
  components: {
    CheckButton
  }
};
</script>
<style scoped>
.cart-bottom-bar {
  position: absolute;
  height: 40px;
  background-color: #eee;
  bottom: 49px;
  right: 0;
  left: 0;
  font-size: 18px;
  padding: 0 5px;
  display: flex;
  justify-content: space-between
}
.check-content {
  height: 100%;
  display: flex;
  align-items: center;
}
.check-button {
  width: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.check-title {
  margin-left: 10px;
}
.total-price {
  margin-left: 20px;
}
.calculate {
  background-color: red;
  color: #fff;
padding: 0 8px;
 text-align: center;
 line-height: 40px;

}
</style>