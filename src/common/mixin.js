// 1.监听图片加载完成的操作
import { debounce } from 'common/utils.js'
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    mounted() {
        // 1.监听item中的图片加载完成,图片加载完成后我们为你就可以刷新scroll
        // 为避免每次加载完图片都得执行一次refresh方法，太频繁；这里使用防抖函数debounce

        let refresh = debounce(this.$refs.scroll.refresh, 100)
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
        console.log('这里是mixin')
    },
}

// 2.返回顶部的操作
import BackTop from "components/content/backTop/BackTop";
export const backTop={
    data() {
        return {
             //设置backTop按钮显示或隐藏
            isShowBackTop:false
        }
    },
    methods: {
    // 返回顶部的方法
    backTopClick() {
        this.$refs.scroll.scrollTo(0, 0);
      },
    },
    components:{
        BackTop
    }
}