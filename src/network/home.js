import { request } from './request'

//因为首页会有多个请求,所以
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoodsdata(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })
}