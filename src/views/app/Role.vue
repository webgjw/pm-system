<template>
<div class="main-body">
    <!-- 工具栏 -->
    <div class="toolbar">
        <el-form :inline="true" :model="filters">
            <el-form-item>
                <el-input v-model="filters.name" :placeholder="t('thead.username')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="search" type="primary" @click="findPage">{{ t('action.search') }}</el-button>
            </el-form-item>
            <el-form-item>
                <el-button icon="plus" type="primary">{{ t('action.add') }}</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 表格内容栏 -->
    <cm-table
        ref="tableRef"
        :get-page="listPage"
        :filters="filters"
        :columns="columns"
        :operations="operations"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
    >
    </cm-table>
</div>
</template>

<script setup>
import { listPage } from '@/apis/app-role';
const { t } = useI18n();
const tableRef = ref();
const filters = reactive({
    name: '',
});
const columns = computed(() => [
    { type: 'selection' },
    { prop: 'id', label: t('thead.ID'), minWidth: 50 },
    { prop: 'name', label: t('thead.roleName'), minWidth: 120 },
    { prop: 'remark', label: t('thead.remark'), minWidth: 120, showOverflowTooltip: true },
    { prop: 'createdBy', label: t('thead.createdBy'), minWidth: 120 },
    { prop: 'createdTime', label: t('thead.createdTime'), minWidth: 160 },
    { prop: 'lastUpdateBy', label: t('thead.updatedBy'), minWidth: 120 },
    { prop: 'lastUpdateTime', label: t('thead.updatedTime'), minWidth: 160 },
]);
const operations = [
    {
        type: 'edit'
    },
    {
        label: t('action.bindResource'),
        onClick: handleBindResource
    },
    {
        type: 'delete'
    }
];

// 获取分页数据
function findPage() {
    tableRef.value.reload();
}
function handleEdit(row) {
    console.log('edit', row);
}
function handleDelete(ids, callback) {
    console.log('delete', ids, callback);
}
function handleBindResource(row) {
    console.log('bindResource', row);
}
</script>