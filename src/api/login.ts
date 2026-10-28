import request from '@/untils/request'
import type { users } from '@/types/users';


// 登录用get模拟登录查询
export function login(data: { account: string; password: string }) {
  return request.get('/users', {
    params: {
      account: data.account,
      password: data.password
    }
  })
}

//用token查找用户的数据
export function getUserByToken(token: string) {
  return request.get('users', {
    params: {
      token: token
    }
  })
}

// 注册新增用户
export function register(data:users) {
  return request.post('/users', data)
}