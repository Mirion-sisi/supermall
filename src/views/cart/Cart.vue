<template>
    <div class="cart">
        <nav-bar class="cart-top-nav">
            <template v-slot:center>
                <div>
                    购物车({{length}})
                </div>
            </template>
        </nav-bar>
        <cart-list></cart-list>
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>
<script>
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import NavBar from '../../components/common/navbar/NavBar'
// getters的辅助函数,仅仅将store中的getter映射到组件的计算属性中
import {mapGetters} from 'vuex'
export default {
    name:'Cart',
    computed: {
        // 1.使用对象展开运算将getter混入computed中
        // ...mapGetters([
        //     'cartLength'
        // ]),
        // 2.如果想给getter属性去一个别名，使用对象形式
        ...mapGetters({
            length: 'cartLength'
        })
    },
  
    components:{
        NavBar,
        CartList,
        CartBottomBar
    }
}
</script>
<style scoped>
.cart-top-nav{
    color: #ffffff;
    background-color: var(--color-tint);
}
</style>