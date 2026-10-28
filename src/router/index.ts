import {createRouter, createWebHashHistory} from 'vue-router'
import Login from '@/views/Login.vue'
import Menu from '@/views/Menu.vue'
import Home from '@/views/menu/Home.vue'
import Settting from '@/views/menu/Settting.vue'
import LoginLog from '@/views/menu/LoginLog.vue'
import { useUserinfoStore } from '@/store/userinfo'
import { getUserByToken } from '@/api/login'
import { ElMessage } from 'element-plus'

const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path: '/',
            redirect: '/login'
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'menu',
            path: '/menu',
            component: Menu,
            children: [
                {
                    name: 'home',
                    path: '/home',
                    component: Home
                },
                {
                    name: 'loginlog',
                    path: '/loginlog',
                    component: LoginLog
                },
                {
                    name: 'setting',
                    path: '/setting',
                    component: Settting
                }
            ]
        }
    ]
})
//定义不需要登录就能查看的路径
const publicViews = ['/login']
router.beforeEach(async (to, from, next)=> {
    //获取本地存储的token
    const token = localStorage.getItem('token')
    //有token但是不是去登录页面
    if(token && !publicViews.includes(to.path)) {
        const userinfoStore = useUserinfoStore()
        //判断pinia里面是否有用户数据
        if(!userinfoStore.id) {
            try {
                //用token获取用户数据
                const res = await getUserByToken(token)
                if(res.data.length > 0) {
                    userinfoStore.setuser(res.data[0])
                    next()
                } else {
                    localStorage.removeItem('token')
                    next('/login')
                }
            } catch {
                localStorage.removeItem('token')
                ElMessage.error('登录过期')
                next('/login')
            }
        } else {
            next()
        }
    } else if(token && to.path === '/login') {
        next('/home')
    } else if(!token && !publicViews.includes(to.path)) {
        next('/login')
    } else {
        next()
    }
})

export default router