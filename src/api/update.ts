import request from '@/untils/request.ts'
import type{ users } from '@/types/users'

//更新数据
export function update(id: string, data: Partial<users>) {
    return request.patch(`/users/${id}`, data)
}