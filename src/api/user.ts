//用户修改部分数据
import request from '@/untils/request'
import type { Userinfo } from '@/types/Userinfo'

export function updateUser(id: string, data: Partial<Userinfo>) {
    return request.patch(`/users/${id}`,data)
}