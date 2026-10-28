import {defineStore} from 'pinia'
import {ref} from 'vue'
import type { Userinfo } from '@/types/Userinfo'

export const useUserinfoStore = defineStore('userinfo',()=>{
    //定义存储的数据
    const avatar = ref('')//头像
    const account = ref('')//账号
    const name = ref('')//姓名
    const sex = ref('')//性别
    const role = ref('')//职位
    const department = ref('')//部门
    const email = ref('')//邮箱
    const token = ref('')//token
    const id = ref('')//id
    //获取后端数据存储到pinia里
    function setuser(info: Userinfo) {
        avatar.value = info.avatar
        account.value = info.account
        name.value = info.name
        sex.value = info.sex
        role.value = info.role
        department.value = info.department
        email.value = info.email
        token.value = info.token
        id.value = info.id
    }
    //更新存储的数据
    function updateuser(changedData:Partial<Userinfo>) {
        if (changedData.avatar !== undefined) avatar.value = changedData.avatar
        if (changedData.account !== undefined) account.value = changedData.account
        if (changedData.name !== undefined) name.value = changedData.name
        if (changedData.sex !== undefined) sex.value = changedData.sex
        if (changedData.role !== undefined) role.value = changedData.role
        if (changedData.department !== undefined) department.value = changedData.department
        if (changedData.email !== undefined) email.value = changedData.email
    }
    //退出登录后自动清空pinia
    function loginout() {
        avatar.value = ''
        account.value= ''
        name.value = ''
        sex.value = ''
        role.value = ''
        department.value = ''
        email.value = ''
    }
    return {
        avatar,
        account,
        name,
        sex,
        role,
        department,
        email,
        token,
        id,
        setuser,
        updateuser,
        loginout
    }
})