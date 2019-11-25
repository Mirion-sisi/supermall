import axios from 'axios'

export function request(config) {
    // 1.创建axios实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000/api/vip',
        // baseURL: 'http://106.54.54.237:8000/api/v1',
        timeout: 5000
    })

    // 2.axios拦截器
    // 2.1 请求拦截器-我们需要统一对请求带而数据做一些处理
    instance.interceptors.request.use(config => {
        //请求拦截器拦截的是要往外请求的数据,
        // console.log(config);
        // 1.比如config 中的一些信息不符合服务器的需求
        // 2.比如每次发送网络请求时，都希望在界面中国显示一个请求的图标
        // 3.某些网络请求(比如登录(token)),必须携带一些特殊的信息

        // 请求拦截器需要放行才能进行网络请求
        return config;
    })
    // 2.2响应拦截器
    instance.interceptors.response.use(res=>{
        // 请求成功,需要过滤掉你不需要的数据，直接返回我们需要的数据就行了
        
        return res.data
       
    },err=>{
        console.log(err)
    })

    // 3.发送真正的网络请求
    return instance(config)
}