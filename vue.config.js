module.exports = {
    configureWebpack: {
        // extensions:['.js','.vue','.json'],导入文件的时候省略后缀；这里再不用配置，创建的时候已经配置好了
        resolve: {
            alias:{
                // '@':'src'  已经配置过了，所以我们可以引用@
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views'
            }
        }

    }
}