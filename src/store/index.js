import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  },
  mutations: {
    // mutations目的是改变state中属性的值，
    // 一个方法最好只做一件事
    incrementCount(state, index) {
      state.cartList[index].count += 1
      console.log(state.cartList[index])
    },
    addToCart(state, goods) {
      console.log(goods)
      state.cartList.push(goods)
    },
  },
  actions: {
    addToCart(context, payload) {
      return new Promise(resolve => {
        // 1.查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        // 2.判断oldProduct的有无
        if (oldProduct) {
          const index = context.state.cartList.indexOf(oldProduct)
          context.commit('incrementCount', index)
          resolve('购物车中商品的数量加一')
        } else {
          payload.count = 1
          context.commit('addToCart', payload)
          resolve('购物车添加了新商品')
        }
      })
    }
  },
  modules: {
  }
})
