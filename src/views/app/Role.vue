<template>
<div class="main-body">
    <!-- 工具栏 -->
    <div class="toolbar">
        <el-form :inline="true" :model="filters">
            <el-form-item>
                <el-input v-model="filters.name" :placeholder="t('thead.username')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="search" type="primary" @click="doSearch">{{ t('action.search') }}</el-button>
            </el-form-item>
            <el-form-item>
                <el-button icon="plus" type="primary" @click="doAdd">{{ t('action.add') }}</el-button>
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
        @handleEdit="doEdit"
        @handleDelete="handleDelete"
    >
    </cm-table>
</div>
<!-- 新增/编辑 -->
<el-dialog
    :title="isEdit ? t('action.edit') : t('action.add')"
    width="40%"
    draggable
    v-model="dialogVisible"
    :close-on-click-modal="false"
    @close="doClose"
>
    <el-form ref="formRef" :model="form" label-width="80px" :rules="rules">
        <el-form-item :label="t('thead.roleName')" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="t('thead.remark')" prop="remark">
            <el-input v-model="form.remark" type="textarea"></el-input>
        </el-form-item>
    </el-form>
    <template #footer>
        <div class="dialog-footer">
            <el-button @click="doClose">{{ t('action.cancel') }}</el-button>
            <el-button
                type="primary"
                @click="handleSubmit"
                :loading="formLoading"
            >{{ t('action.submit') }}</el-button>
        </div>
    </template>
</el-dialog>
</template>

<script setup>
import { listPage, save, update } from '@/apis/app-role';
import { listTree } from '@/apis/app-resource';
import useTableHandlers from '../use-table-handlers';
const filters = reactive({
    name: '',
});
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
const form = reactive({
    id: '',
    name: '',
    remark: '',
});
const {
    t,
    tableRef,
    dialogVisible,
    isEdit,
    formLoading,
    formRef,
    doSearch,
    doAdd,
    doEdit,
    doSubmit,
    doClose
} = useTableHandlers(form);

// computed 
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
const rules = computed(() => {
    return {
        name: [
            { required: true, message: t('form.nameRequired'), trigger: ['blur', 'change'] }
        ],
    }
});

// methods
function handleDelete(ids, callback) {
    console.log('delete', ids, callback);
}
function handleBindResource(row) {
    console.log('bindResource', row);
}
function handleSubmit() {
    doSubmit({ save, update });
}
</script>