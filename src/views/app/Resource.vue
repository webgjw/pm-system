<template>
<div class="main-body">
    <!-- 工具栏 -->
    <div class="toolbar">
        <el-form :inline="true" :model="filters">
            <el-form-item>
                <el-input v-model="filters.title" :placeholder="t('thead.title')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="search" type="primary" @click="findPage">{{ t('action.search') }}</el-button>
            </el-form-item>
            <el-form-item>
                <el-button icon="plus" type="primary">{{ t('action.add') }}</el-button>
            </el-form-item>
        </el-form>
    </div>
    <!-- 表格树内容栏 -->
    <cm-table
        row-key="id"
        ref="tableRef"
        :get-page="listTree"
        :filters="filters"
        :columns="columns"
        :showBatchDelete="false"
        :showPagination="false"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
    >
    </cm-table>
</div>
</template>

<script setup>
import { listTree } from '@/apis/app-resource';
const { t } = useI18n();
const tableRef = ref();
const filters = reactive({
    title: '',
});
const menuTypeList = ref(['folder', 'menu', 'button']);
const columns = computed(() => [
    { prop: 'id', label: t('thead.ID') },
    { prop: 'name', label: t('thead.name') },
    { prop: 'displayName', label: t('thead.displayName') },
    { prop: 'icon', label: t('thead.icon') },
    {
        prop: 'type', label: t('thead.type'), formatter: (row) => {
            const type = row.type;
            const typeMap = {
                1: 'success',
                2: 'info'
            };
            return h(
                ElTag,
                {
                    type: typeMap[type] || ''
                },
                () => t(`status.${menuTypeList.value[type]}`)
            )
        }
    },
    { prop: 'url', label: t('thead.url'), showOverflowTooltip: true },
    { prop: 'orderNum', label: t('thead.orderNum') }
]);
const operations = [
    {
        type: 'edit',
        disabled: (row) => !!row.publishTime
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
</script>