import axios from 'axios'
import { ElMessage } from 'element-plus';

const instance = axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

//请求拦截器
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        config.headers.Authorization = `Bearer ${token}`
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

//响应拦截器
instance.interceptors.response.use(
    res => res,
    err => {
        if(err.message === 'no token') {
            return Promise.reject(err)
        }
        if(err.code === 'ECONNABORTED') {
            ElMessage.warning('请求超时，请稍后尝试')
            return Promise.reject(err)
        }
        if(err.message === 'Network Error') {
            ElMessage.warning('网络异常，无法连接到服务器')
            return Promise.reject(err)
        }
        if(!err.response) {
            ElMessage.warning('未知错误')
            return Promise.reject(err)
        }
        const status = err.response.status
        switch(status) {
            case 401: {
                localStorage.removeItem('token')
                break
            }
            case 429: {
                ElMessage.warning('请求频繁')
                break
            }
            case 503: {
                ElMessage.warning('服务不可用')
                break
            }
            default: {
                console.error(`未处理状态码 ${status}`)
            }
        }
        return Promise.reject(err)

    }
)


export default instance