<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏 -->
        <div class="title">后台管理系统</div>
        <el-menu default-active="home" class="el-menu-vertical-demo" router>
            <el-menu-item index="home">
                <el-icon><House /></el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index="2">
                <el-icon><Document /></el-icon>
                <span>系统概览</span>
            </el-menu-item>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon><User /></el-icon>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group title="管理员管理">
                    <el-menu-item index="3-1">产品管理员</el-menu-item>
                    <el-menu-item index="3-2">用户管理管理员</el-menu-item>
                    <el-menu-item index="3-3">消息管理员</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="员工管理">
                    <el-menu-item index="3-4">用户列表</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="4">
                <template #title>
                    <el-icon><TakeawayBox /></el-icon>
                    <span>产品管理</span>
                </template>
                <el-menu-item-group title="入库管理">
                    <el-menu-item index="4-1">入库列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="出库管理">
                    <el-menu-item index="4-2">出库列表</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="5">
                <template #title>
                    <el-icon><ChatLineRound /></el-icon>
                    <span>消息管理</span>
                </template>
                <el-menu-item-group title="消息管理">
                    <el-menu-item index="5-1">消息列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="回收站">
                    <el-menu-item index="5-2">回收站</el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="6">
                <el-icon><Files /></el-icon>
                <span>合同管理</span>
            </el-menu-item>
            <el-menu-item index="7">
                <el-icon><DocumentCopy /></el-icon>
                <span>操作日志</span>
            </el-menu-item>
            <el-menu-item index="loginlog">
                <el-icon><CopyDocument /></el-icon>
                <span>登录日志</span>
            </el-menu-item>
            <el-menu-item index="setting">
                <el-icon><Tools /></el-icon>
                <span>系统设置</span>
            </el-menu-item>
      </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部 -->
        <el-header>
          <div class="header-left-content">尊敬的{{userinfoStore.name ?? userinfoStore.id}}欢迎您的登录</div>
          <div class="header-right-content">
            <el-icon><Message /></el-icon>
            <el-avatar :size="24" :src="circleUrl" />
            <el-dropdown placement="bottom">
              <span class="settings">设置</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>设置账号</el-dropdown-item>
                  <el-dropdown-item>更改头像</el-dropdown-item>
                  <el-dropdown-item @click="goLogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <!-- 内容部分 -->
        <el-main>
            <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
    export default {
    name: 'Menu'
    }
</script>

<script lang="ts" setup>
  import { RouterView, useRouter } from 'vue-router'
  import { onMounted, reactive,toRefs } from 'vue'
  import { useUserinfoStore } from '@/store/userinfo';

  const userinfoStore = useUserinfoStore()
  const menuRoute = useRouter()
  onMounted(() => {
  if (menuRoute.currentRoute.value.name !== 'home') {
      menuRoute.push({ name: 'home' })
  }
  })
  const state = reactive({
    circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  })
  const {circleUrl} = toRefs(state)
  function goLogin() {
    localStorage.removeItem('token')
    menuRoute.replace({name: 'login'})
  }
</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  overflow: hidden;
}

.common-layout :deep(.el-container) {
  height: 100%;
}

.el-aside {
  background-color: #001529;
  color: #fff;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #435a71;
    border-radius: 2px;
  }
}

.title {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0;
}

.el-menu {
  border-right: none;
  background-color: transparent;

  :deep(.el-menu-item) {
    color: rgba(255, 255, 255, 0.75);
    height: 48px;
    line-height: 48px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
      color: #fff;
    }

    &.is-active {
      background-color: #409eff;
      color: #fff;
    }

    .el-icon {
      margin-right: 8px;
      font-size: 16px;
    }
  }

  :deep(.el-sub-menu__title) {
    color: rgba(255, 255, 255, 0.75);
    height: 48px;
    line-height: 48px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.08);
      color: #fff;
    }

    .el-icon {
      margin-right: 8px;
      font-size: 16px;
    }
  }

  :deep(.el-menu--inline) {
    background-color: #000c17;

    .el-menu-item {
      height: 42px;
      line-height: 42px;
      font-size: 13px;
      padding-left: 48px !important;

      &:hover {
        background-color: rgba(255, 255, 255, 0.06);
      }

      &.is-active {
        background-color: #409eff;
        color: #fff;
      }
    }

    .el-menu-item-group__title {
      padding: 8px 0 4px 24px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.45);
      line-height: 1.4;
    }
  }
}

.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  height: 60px;
  line-height: 60px;
  padding: 0 24px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.header-right-content {
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 0 20px
}

.settings {
  cursor: pointer;
}

.el-main {
  background-color: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}
</style>