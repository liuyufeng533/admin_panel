<template>
    <el-dialog
    v-model="forgetPasswordDialog"
    title="忘记密码"
    width="500px"
    >
        <el-form :model="forgetDate" :rules="rules" label-position="top">
            <el-form-item label="输入您的注册账号" prop="account">
                <el-input v-model="forgetDate.account" placeholder="请输入您的账号" />
            </el-form-item>

            <el-form-item label="输入您的注册邮箱" prop="email">
                <el-input v-model="forgetDate.email" placeholder="请输入您的电子邮箱" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="forgetPasswordDialog = false">取消</el-button>
                <el-button type="primary" @click="openChange">下一步</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog
    v-model="repasswordDialog"
    title = "修改密码"
    width="500px"
    >
        <el-form :model="forgetDate" :rules="rules" label-position="top">
            <el-form-item label="请输入您的新密码" prop="password">
                <el-input v-model="forgetDate.password" type="passeword" showpassword placeholder="请输入您的新密码" />
            </el-form-item>

            <el-form-item label="请再次确认您的新密码" prop="password">
                <el-input v-model="forgetDate.repassword" type="passeword" showpassword placeholder="请确认您的新密码" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="send">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts">
    export default {
        name: 'ForgetPassword'
    }
</script>

<script lang="ts" setup>
    import { ref,reactive } from 'vue'

    const forgetPasswordDialog = ref(false)
    interface newDate {
        account: number | null,
        email: string
        password: string
        repassword: string
    }
    const forgetDate = reactive<newDate>({
        account: null,
        email: '',
        password: '',
        repassword: ''
    })
    function open() {
        forgetPasswordDialog.value = true
    }
    defineExpose({
        open
    })
    function openChange() {
        forgetPasswordDialog.value = false
        repasswordDialog.value = true
    }
    const rules = reactive({
        account: [
            { required: true, message: '请输入您的注册账号', trigger: 'blur' }
        ],
        email: [
            { required: true, message: '请输入您的注册邮箱', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
        ]
    })
    const repasswordDialog =ref(false)
    function send() {
        repasswordDialog.value = false
    }
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