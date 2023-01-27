import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'
//本地缓存
//import LocalCache from '@/utils/cache'
//loading
//import useMainStore from '@/store/modules/main'
//const mainStore = useMainStore()

class ZXRequest {
    constructor(baseURL, timeout = 10000) {
        this.instance = axios.create({
            baseURL,
            timeout,
        })

        this.instance.interceptors.request.use(
            (config) => {
                //loading
//                 mainStore.isLoading = true
                //token
//                 const token = LocalCache.getCache('token')
//                 if (token) {
//                     config.headers.Authorization = `Bearer ${token}`
//                 }
                return config
            },
            (err) => {
                return err
            }
        )
        this.instance.interceptors.response.use(
            (res) => {
                //loading
                //mainStore.isLoading = false
                //const code = res.data.code
                // 正确情况下
                //判断后端返回的状态码
//                 if (code == 200) {
//                     return res
//                 } else if (code == 400) {
//                     Toast({
//                         message: res.data.msg,
//                         position: 'bottom',
//                     })
//                 } else if (code == 401) {
//                     // token过期状态
//                     // ElMessage.success('你的用户信息已过期，请重新登录！')
//                     //  message.success('你的用户信息已过期，请重新登录！')
//                     LocalCache.deleteCache('userInfo')
//                     // 跳转登录页
//                     router.push({
//                         name: 'login',
//                         query: {
//                             redirect: router.currentRoute.value.fullPath,
//                         },
//                     })
//                     return Promise.reject(res)
//                 } else {
//                     // 其他错误状态
//                     // ElMessage.error(res.data.msg || '请求数据失败！请稍后再试！')
//                     return Promise.reject(res.data)
//                 }
            },
            (err) => {
                mainStore.isLoading = false
                return err
            }
        )
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.instance
                .request(config)
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    get(config) {
        return this.request({ ...config, method: 'get' })
    }

    post(config) {
        return this.request({ ...config, method: 'post' })
    }

    patch(config) {
        return this.request({ ...config, method: 'patch' })
    }

    delete(config) {
        return this.request({ ...config, method: 'delete' })
    }
}

export default new ZXRequest(BASE_URL, TIMEOUT)
