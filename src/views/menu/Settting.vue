<template>
    <Breadcrumb :items="items"/>
    <div class="common-wrapped">
        <div class="common-content">
            <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="账号详情" name="first">
                    <span>头像：</span><span>{{ form.avatar }}</span><br/>
                    <el-form label-width="60px" style="max-width: 600px" label-position="left">
                        <el-form-item label="账号：">
                            <el-input v-model="form.account" style="width: 200px"/>
                        </el-form-item>
                    </el-form>
                    <span>密码：</span><el-button type="primary">修改密码</el-button>
                    <el-form label-width="60px" style="max-width: 600px" label-position="left">
                        <el-form-item label="姓名：">
                            <el-input v-model="form.name" style="width: 200px"/>
                        </el-form-item>
                    </el-form>
                    <el-form label-width="60px" style="max-width: 600px" label-position="left">
                        <el-form-item label="性别：">
                            <el-input v-model="form.sex" style="width: 200px"/>
                        </el-form-item>
                    </el-form>
                    <el-form label-width="60px" style="max-width: 600px" label-position="left">
                        <el-form-item label="身份：">
                            <el-input v-model="form.role" style="width: 200px"/>
                        </el-form-item>
                    </el-form>
                    <el-form label-width="60px" style="max-width: 600px" label-position="left">
                        <el-form-item label="部门：">
                            <el-input v-model="form.department" style="width: 200px"/>
                        </el-form-item>
                    </el-form>
                    <el-form label-width="60px" style="max-width: 600px" label-position="left">
                        <el-form-item label="邮箱：">
                            <el-input v-model="form.email" style="width: 200px"/>
                        </el-form-item>
                        <el-button type="primary" @click="handleSave">一键保存</el-button>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="公司信息" name="second">Config</el-tab-pane>
                <el-tab-pane label="首页管理" name="third">Role</el-tab-pane>
                <el-tab-pane label="其他设置" name="fourth">Task</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Setting'
    }
</script>

<script lang="ts" setup>
    import {ref,reactive} from 'vue'
    import Breadcrumb from '@/components/Breadcrumb.vue'
    import {useUserinfoStore} from '@/store/userinfo'
    import { storeToRefs } from 'pinia';
    import type { Userinfo } from '@/types/Userinfo';
    import { updateUser } from '@/api/user';
    import {ElMessage} from 'element-plus'

    const activeName = ref('first')
    const items = ref({
        first: '系统设置',
    })
    const userinfoStore = useUserinfoStore()
    const {
        avatar,
        account,
        name,
        sex,
        role,
        department,
        email
    } = storeToRefs(userinfoStore)
    const {updateuser} = userinfoStore
    //从pinia里面复制一份当成草稿便于修改与保存
    const form = reactive({
        avatar: avatar.value,
        account: account.value,
        name: name.value,
        sex: sex.value,
        role: role.value,
        department: department.value,
        email: email.value,
    })
    //定义修改函数
    const handleSave = async() => {
        //定义索引用于对比值是否发生变化
        const filed = ['account', 'name', 'sex', 'role', 'department', 'email', 'avatar']as const
        const changedData:Partial<Userinfo> = {}
        let hasChanged = false
        filed.forEach(key=>{
            if(form[key] !== userinfoStore[key]) {
                changedData[key] = form[key]
                hasChanged = true
            }
        })
        if(hasChanged) {
            //更新pinia中的数据
            updateuser(changedData)
            //将更新后的数据传递给后端
            try {
                await updateUser(userinfoStore.id, changedData)
                ElMessage.success('保存成功')
            }catch(err) {
                ElMessage.error('同步到后端失败')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .demo-tabs > .el-tabs__content {
        padding: 32px;
        color: #6b778c;
        font-size: 32px;
        font-weight: 600;
    }
    .common-wrapped {
        height: calc(100vh - 90px);
        background-color: #f5f5f5;
        overflow: hidden;
        
        .common-content {
            height: 100%;
        }
    }

    .common-content {
        :deep(.el-button) {
            margin-left: 20px;
        }
    }
</style>