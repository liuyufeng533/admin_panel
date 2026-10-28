<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-wrapped">
        <div class="header wth">
          <h3>后台管理系统</h3>
          <span>欢迎您的登录</span>
        </div>
      </el-header>
      <el-main>
        <div class="login-wrapped wth">
          <el-card class="box-card">
            <el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
              <el-tab-pane label="登录" name="first">
                  <el-form-item label="账号">
                    <el-input v-model="loginData.account" placeholder="请输入账号"/>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model="loginData.password" type="password" show-password placeholder="请输入密码"/>
                  </el-form-item>
                  <div class="footer">
                    <div class="forget-password" @click="onForgetPssword">忘记密码</div>
                    <el-button type="primary" @click="handleLogin">登录</el-button>
                    <div class="footer-go-register">忘记密码？<span @click="activeName = 'second'">马上注册</span></div>
                  </div>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                <el-form-item label="账号">
                    <el-input v-model="registerData.account" placeholder="账号6-12位数字"/>
                </el-form-item>
                 <el-form-item label="电子邮箱">
                    <el-input v-model="registerData.email" placeholder="请输入电子邮箱"/>
                </el-form-item>
                <el-form-item label="密码">
                  <el-input type="password" v-model="registerData.password" show-password placeholder="请再次输入密码"/>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                  <el-input
                    type="password"
                    show-password
                    v-model="registerData.repassword"
                    placeholder="密码6-12位需包含数字和字母"
                  />
                </el-form-item>
                <el-button type="primary" @click="handleRegister">注册</el-button>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
  <ForgetpPassword ref="forgetpassword"/>
</template>

<script lang="ts">
  export default{
    name: 'Login'
  }
</script>

<script lang="ts" setup>
  import { ref,reactive } from 'vue'
  import ForgetpPassword from '@/components/ForgetpPassword.vue'
  import { useRouter } from 'vue-router'
  import { login,register} from '@/api/login'
  import { ElMessage } from 'element-plus'
  import request from '@/untils/request'
  import {useUserinfoStore} from '@/store/userinfo'
  
  const activeName = ref('first')
  interface formDate{
    account: string,
    email?: string,
    password: string,
    repassword?: string
  }
  //登录表单数据
  const loginData = reactive<formDate>({
    account: '',
    password: ''
  })
  //注册表单数据
  const registerData = reactive<formDate>({
    account: '',
    email: '',
    password: '',
    repassword: ''
  })
  const forgetpassword = ref()
  function onForgetPssword() {
    forgetpassword.value.open()
  }
  const router = useRouter()
  //登录验证
  const handleLogin = async () => {
    try {
      // 用 GET 查 users，看有没有匹配的账号密码
      const info = await login({
        account: loginData.account,
        password: loginData.password
      })
      if (info.data && info.data.length > 0) {
        // 查到了 = 登录成功
        ElMessage.success('登录成功')
        //登录成功将后端传入的用户数据存到pinia
        const UserinfoStore = useUserinfoStore()
        UserinfoStore.setuser(info.data[0])
        //把token放到本地存储里面
        const token = UserinfoStore.token
        localStorage.setItem('token', token)
        //跳转到首页
        router.push('/home')
      } else {
        // 没查到 = 账号或密码错误
        ElMessage.error('账号或密码错误')
      }
    } catch (err) {
      console.error(err)
      ElMessage.error('登录失败，请检查网络')
    }
  }
  //注册
    const handleRegister = async () => {
    const accountStr = registerData.account.trim()
    const email = registerData.email ?? ''
    const password = registerData.password
    const repassword = registerData.repassword ?? ''

    // 基础校验
    if (!/^\d{6,12}$/.test(accountStr)) {
      ElMessage.warning('账号需为6-12位数字')
      return
    }
    if (!email) {
      ElMessage.warning('请输入电子邮箱')
      return
    }
    if (!password) {
      ElMessage.warning('请输入密码')
      return
    }
    if (password !== repassword) {
      ElMessage.error('两次输入的密码不一致')
      return
    }

    try {
      //先查这个账号是否已存在
      const exist = await request.get('/users', {
        params: { account: Number(accountStr) }
      })
      if (exist.data.length > 0) {
        ElMessage.error('该账号已存在')
        return
      }

      //不存在，才真正注册
      //格式化数据
      const avatar = ''
      const name = ''
      const sex = ''
      const role = ''
      const department = ''
      await register({
        account: Number(accountStr),   // 转成数字再提交
        password,
        email,
        avatar,
        name,
        sex,
        role,
        department
      })

      ElMessage.success('注册成功，请登录')

      // 清空表单
      registerData.account = ''
      registerData.email = ''
      registerData.password = ''
      registerData.repassword = ''

      // 切回登录标签页
      activeName.value = 'first'
    } catch (err) {
      console.error(err)
      ElMessage.error('注册失败，请重试')
    }
  }
</script>

<style lang="scss" scoped>
  .wth {
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
  }

  .header-wrapped {
    background-color: skyblue;
  }

  .header {
    display: flex;
    align-items: center;

    h3 {
      flex: 0.75;
      text-align: center;
    }

    span {
      flex: 0.25;
      text-align: center;
      font-size: 14px;
    }
  }

  .login-wrapped {
  height: 500px;

  .box-card {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    float: right;
    width: 350px;
    height: 375px;

    :deep(.el-card__body) {
      height: 100%;
      box-sizing: border-box;
      padding: 20px;
    }

    :deep(.el-tabs__content) {
      padding-top: 10px;
    }

    :deep(.el-tab-pane) {
      .footer {
        display: flex;
        flex-direction: column;
        align-items: flex-end; 
        gap: 20px;
        margin-top: 16px;
      }

      .forget-password {
        font-size: 12px;
        color: #409eff;
        cursor: pointer;
      }

      .el-button {
        margin-top: 10px;
        width: 100%;
      }

      .footer-go-register {
        margin-top: 10px;
        text-align: center;
        width: 100%;
        font-size: 13px;

        span {
          color: #409eff;
          cursor: pointer;
        }
      }
    }
    :deep(.el-form-item__label) {
      font-size: 14px;
    }
  }
}
</style>