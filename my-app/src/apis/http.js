import axios from 'axios'
import { Toast } from 'antd-mobile'
// import store from '../store'
// import Cookie from 'js-cookie'


// 创建axios实例

console.log(process.env.NODE_ENV)
    // let service;

// if (process.env.NODE_ENV == 'development') {
let service = axios.create({
        // url_base: 'http://192.168.0.20:9090',
        baseURL: 'http://localhost:3000/',
        timeout: 5000 // 请求超时时间
    })
    // } else {
    // service = axios.create({
    //     url_base: 'https://www.prosuntech.com',
    //     baseURL: 'https://www.prosuntech.com/pst-oa-api/v2',
    //     timeout: 5000 // 请求超时时间
    // })
    // }

// request拦截器
service.interceptors.request.use(config => {
    // config.headers['access_token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    return config
}, error => {
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 200) {
            Toast.offline('Network connection failed !!!', 1);

            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                //     confirmButtonText: '重新登录',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //     store.dispatch('FedLogOut').then(() => {
                //         location.reload() // 为了重新实例化vue-router对象 避免bug
                //     })
                // })
            }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err11' + error) // for debug
        Toast.offline('Network connection failed !!!', 1);
        return Promise.reject(error)
    }
)

export default service