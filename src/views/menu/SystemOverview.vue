<template>
    <div class="overview-wrap">
        <!-- 项目简介 -->
        <el-card class="overview-card" shadow="hover">
            <template #header>
                <div class="card-header">
                    <el-icon :size="20"><InfoFilled /></el-icon>
                    <span>项目简介</span>
                </div>
            </template>
            <p class="desc">
                本项目是一个基于 Vue 3 + TypeScript 的后台管理系统，旨在提供一套完整的后台管理解决方案，
                覆盖权限控制、用户管理、系统配置、数据可视化等核心场景。系统采用前后端分离架构，
                通过 MSW（Mock Service Worker）实现前端接口模拟，可独立部署到静态托管平台，
                无需后端支持即可完整演示所有功能。
            </p>
        </el-card>

        <!-- 技术栈 -->
        <el-card class="overview-card" shadow="hover">
            <template #header>
                <div class="card-header">
                    <el-icon :size="20"><Cpu /></el-icon>
                    <span>技术栈</span>
                </div>
            </template>
            <div class="tech-grid">
                <div v-for="tech in techStack" :key="tech.name" class="tech-item">
                    <div class="tech-icon" :style="{ background: tech.color }">
                        <el-icon :size="24"><component :is="tech.icon" /></el-icon>
                    </div>
                    <div class="tech-info">
                        <div class="tech-name">{{ tech.name }}</div>
                        <div class="tech-ver">v{{ tech.version }}</div>
                        <div class="tech-desc">{{ tech.desc }}</div>
                    </div>
                </div>
            </div>
        </el-card>

        <!-- 功能模块 -->
        <el-card class="overview-card" shadow="hover">
            <template #header>
                <div class="card-header">
                    <el-icon :size="20"><Operation /></el-icon>
                    <span>功能模块</span>
                </div>
            </template>
            <el-row :gutter="16">
                <el-col :span="8" v-for="mod in modules" :key="mod.title">
                    <div class="mod-item">
                        <el-icon :size="28" :color="mod.color"><component :is="mod.icon" /></el-icon>
                        <div class="mod-title">{{ mod.title }}</div>
                        <div class="mod-desc">{{ mod.desc }}</div>
                    </div>
                </el-col>
            </el-row>
        </el-card>

        <!-- 项目亮点 -->
        <el-card class="overview-card" shadow="hover">
            <template #header>
                <div class="card-header">
                    <el-icon :size="20"><Star /></el-icon>
                    <span>项目亮点</span>
                </div>
            </template>
            <ul class="feature-list">
                <li v-for="f in features" :key="f">
                    <el-icon color="#409eff"><Check /></el-icon>
                    <span>{{ f }}</span>
                </li>
            </ul>
        </el-card>
    </div>
</template>

<script lang="ts">
export default { name: 'SystemOverview' }
</script>

<script lang="ts" setup>
import { ref, markRaw } from 'vue'
import {
    InfoFilled, Cpu, Operation, Star, Check,
    Monitor, Grid, Setting, User, Document, Lock
} from '@element-plus/icons-vue'

// 技术栈
const techStack = ref([
    { name: 'Vue',        version: '3.4+', desc: '渐进式前端框架',  icon: markRaw(Monitor),  color: '#42b883' },
    { name: 'TypeScript', version: '5.x',  desc: '静态类型检查',    icon: markRaw(Grid),     color: '#3178c6' },
    { name: 'Vite',       version: '5.x',  desc: '下一代构建工具',  icon: markRaw(Cpu),      color: '#646cff' },
    { name: 'Element Plus',version: '2.x', desc: '桌面端 UI 组件库',icon: markRaw(Setting),  color: '#409eff' },
    { name: 'Pinia',      version: '2.x',  desc: '官方推荐状态管理',icon: markRaw(Operation),color: '#ffd85a' },
    { name: 'Vue Router', version: '4.x',  desc: '路由管理器',      icon: markRaw(Document), color: '#42b883' },
    { name: 'Axios',      version: '1.x',  desc: 'HTTP 请求库',     icon: markRaw(Lock),     color: '#5a29e4' },
    { name: 'MSW',        version: '2.x',  desc: '接口 Mock 拦截',  icon: markRaw(User),     color: '#ff6b6b' }
])

// 功能模块
const modules = ref([
    { title: '用户认证',   desc: '登录 / 注册 / 路由守卫',          icon: markRaw(Lock),     color: '#409eff' },
    { title: '个人中心',   desc: '账号信息 / 头像 / 密码修改',      icon: markRaw(User),     color: '#67c23a' },
    { title: '系统设置',   desc: '系统参数 / 公司信息配置',          icon: markRaw(Setting),  color: '#e6a23c' },
    { title: '登录日志',   desc: '登录记录查询与追踪',              icon: markRaw(Document), color: '#f56c6c' },
    { title: '仪表盘',     desc: '数据概览与统计图表',              icon: markRaw(Monitor),  color: '#909399' },
    { title: '权限控制',   desc: '基于路由的访问权限管理',          icon: markRaw(Operation),color: '#722ed1' }
])

// 项目亮点
const features = ref([
    '零后端依赖：通过 MSW 在浏览器内拦截请求，无需启动任何服务器即可运行',
    '静态托管兼容：可直接部署到 GitHub Pages / Vercel 等静态平台',
    '登录态持久化：Token + 用户信息自动恢复，刷新不丢失登录状态',
    '数据持久化：Mock 数据写入 localStorage，刷新后仍保留修改',
    '完整路由守卫：Token 校验 + Pinia 用户态补全 + 登录页跳转逻辑',
    'TypeScript 全覆盖：组件、接口、store、类型定义均有完整类型',
    'Element Plus 组件化：UI 全部使用 Element Plus，开发效率高',
])
</script>

<style lang="scss" scoped>
.overview-wrap {
    padding: 16px;
    background: #f5f7fa;
    min-height: calc(100vh - 120px);
    box-sizing: border-box;
}

.overview-card {
    margin-bottom: 16px;
    border-radius: 8px;

    .card-header {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 600;
    }
}

.desc {
    line-height: 1.8;
    color: #606266;
    font-size: 14px;
    margin: 0;
}

// 技术栈网格
.tech-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
}

.tech-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #ebeef5;
    transition: all 0.2s;

    &:hover {
        border-color: #409eff;
        box-shadow: 0 2px 8px rgba(64, 158, 255, 0.15);
        transform: translateY(-2px);
    }
}

.tech-icon {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-shrink: 0;
}

.tech-info {
    flex: 1;
    min-width: 0;
}

.tech-name {
    font-weight: 600;
    font-size: 14px;
    color: #303133;
}

.tech-ver {
    font-size: 12px;
    color: #909399;
    margin: 2px 0 4px;
}

.tech-desc {
    font-size: 12px;
    color: #606266;
}

// 功能模块
.mod-item {
    padding: 20px 12px;
    border: 1px solid #ebeef5;
    border-radius: 6px;
    text-align: center;
    margin-bottom: 16px;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        border-color: #409eff;
        box-shadow: 0 2px 12px rgba(64, 158, 255, 0.2);
    }
}

.mod-title {
    margin: 12px 0 6px;
    font-weight: 600;
    font-size: 15px;
    color: #303133;
}

.mod-desc {
    font-size: 12px;
    color: #909399;
    line-height: 1.5;
}

// 亮点列表
.feature-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 8px 0;
        border-bottom: 1px dashed #ebeef5;
        line-height: 1.6;
        color: #303133;
        font-size: 14px;

        &:last-child {
            border-bottom: none;
        }

        .el-icon {
            flex-shrink: 0;
            margin-top: 3px;
        }
    }
}
</style>