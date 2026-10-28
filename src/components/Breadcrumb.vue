<template>
    <div class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>{{ props.items.first }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="props.items.second">{{ props.items.second }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Breadcrumb'
    }
</script>

<script lang="ts" setup>
    const props = defineProps(['items'])
</script>

<style lang="scss" scoped>
    .breadcrumb {
        display: flex;
        height: 20px;
        align-items: center;
    }

    :deep(.el-breadcrumb__item) {
        height: 3px;
        font-size: 16px;
        line-height: 30px;
    }

    :deep(.el-breadcrumb__inner) {
        font-weight: 500;
    }
</style>