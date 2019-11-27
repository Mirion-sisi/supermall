module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport':{
      viewportWidth:375,//视图的宽度，对应的是我们设计稿的宽度
      viewportHeight:667,//视图的高度，对应的是我们设计稿的高度
      unitPrecision:5,//指定px 转换为视图窗口单位值的小数位数(很多时候无法整除)
      viewportUnit:'vw',//指定需要转换成的视图单位，建议使用vw
      selectorBlackList:['ignore','tab-bar','cart-bottom-bar'],//指定不需要转换的类，正则匹配规则
      minPixelValue:1,//小于或等于'1px'不转换为视窗单位
      mediaQuery:false,//允许在媒体查询中转换‘px'
      exclude:[/TabBar/,/DetailBottomBar/],//匹配文件，必须是正则的格式

    }
  }
}
