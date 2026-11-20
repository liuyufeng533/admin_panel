<template>
    <el-dialog
    v-model="updatePasswordDialog"
    title="修改密码"
    width="500px"
    >
        <el-form :model="newData" :rules="rules" label-position="top">
            <el-form-item label="输入您的新密码" prop="password">
                <el-input v-model="newData.password" type="password" placeholder="输入您的新密码" />
            </el-form-item>
            <el-form-item label="请再次确认您的密码"  prop="repassword">
                <el-input v-model="newData.repassword" type="password" placeholder="请再次确认您的密码" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="updatePasswordDialog = false">取消</el-button>
                <el-button type="primary" @click="openChange">确认修改</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts">
    export default {
        name: 'UpdatePassword'
    }
</script>

<script lang="ts" setup>
    import { ref,reactive } from 'vue'
    import {update} from '@/api/update'
    import { ElMessage } from 'element-plus';
    import {useUserinfoStore} from '@/store/userinfo'

    interface newPassword {
        password: string
        repassword: string
    }
    const newData:newPassword = reactive({
        password: '',
        repassword: ''
    })
    const updatePasswordDialog = ref(false)
    function open() {
        updatePasswordDialog.value = true
    }
    defineExpose({
        open
    })
    const userinfoStore = useUserinfoStore()
    const openChange = async() => {
       if(newData.password !== newData.repassword) {
        ElMessage.error('确认密码与密码不同')
       }else {
        try {
            await update(userinfoStore.id, {password: newData.password})
            ElMessage.success('修改密码成功')
            updatePasswordDialog.value = false
        }catch(err) {
            ElMessage.error('修改密码有误')
        }
       }
    }
    const rules = reactive({
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        repassword: [
            { required: true, message: '请再次确认密码', trigger: 'blur' }
        ]
    })
</script>

<style lang="scss" scoped>
    :deep(.el-form-item) {
        margin-bottom: 30px;
    }

    :deep(.el-form-item__label) {
        padding-left: 10px;
    }

    :deep(.el-input) {
        padding: 0 10px;
        width: 100%;
    }

    :deep(.el-form-item__error) {
        padding: 10px 0 0 10px;
    }
</style>