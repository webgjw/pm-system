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
                <el-button icon="plus" type="primary" @click="handleAdd">{{ t('action.add') }}</el-button>
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

<!-- 新增编辑界面 -->
 <el-dialog
    :title="isEdit ? t('action.edit') : t('action.add')"
    v-model="dialogVisible"
    draggable
    width="40%"
    :close-on-click-modal="false"
    @close="closeDlg"
 >
    <el-form ref="formRef" :model="form" label-width="80px" :rules="rules" label-position="right">
        <el-form-item :label="t('form.username')" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="t('form.group')" prop="roleId">
            <el-select v-model="form.roleId" :placeholder="t('form.choose')" style="width: 100%">
                <el-option
                    v-for="item in roles"
                    :key="item.name"
                    :label="item.label"
                    :value="item.name"
                ></el-option>
            </el-select>
        </el-form-item>
    </el-form>
    <template #footer>
        <el-button @click="closeDlg">{{ t('action.cancel') }}</el-button>
        <el-button
            v-if="isEdit"
            type="primary"
            @click="handleResetPassword"
        >{{ t('form.resetPassword') }}</el-button>
        <el-button
            type="primary"
            @click="handleSubmit"
            :loading="formLoading"
        >{{ t('action.submit') }}</el-button>
    </template>
 </el-dialog>
</template>

<script setup>
import { listPage, save, update, setPsw } from '@/apis/sys-user';
import { roles } from '@/mock/data';
const { t } = useI18n();
const tableRef = ref();
const filters = reactive({
    name: '',
});
const dialogVisible = ref(false);
const isEdit = ref(false);

const formRef = ref();
const form = reactive({
    id: '',
    name: '',
    roleId: '',
});
const formLoading = ref(false);

const __formOld__ = { ...form };


const columns = computed(() => [
    { type: 'selection', selectable: isSelectable },
    { prop: 'id', label: t('thead.ID'), minWidth: 50 },
    { prop: 'name', label: t('thead.username'), minWidth: 120 },
    { prop: 'roleName', label: t('thead.group'), minWidth: 120 },
    { prop: 'createdBy', label: t('thead.createdBy'), minWidth: 120 },
    { prop: 'ip', label: t('thead.latestIp'), minWidth: 100 },
    { prop: 'visitTime', label: t('thead.latestVisit'), minWidth: 120 },
]);
const rules = computed(() => {
    return {
        name: [
            { required: true, message: t('form.nameRequired'), trigger: ['blur', 'change'] },
            { min: 2, max: 60, message: t('form.nameError'), trigger: ['blur', 'change'] }
        ]
    }
});


const operations = [
    {
        type: 'edit',
        show: (row) => row.createdBy !== 'system'
    },
    {
        type: 'delete',
        show: (row) => row.createdBy !== 'system'
    }
];

function isSelectable(row) {
    return row.createdBy !== 'system';
}

// 获取分页数据
function findPage() {
    tableRef.value.reload();
}
function handleEdit(row) {
    isEdit.value = true;
    dialogVisible.value = true;
    for (const k in form) {
        if (k in row) {
            form[k] = row[k];
        }
    }
}
function handleDelete(ids, callback) {
    console.log('delete', ids, callback);
}
function handleAdd() {
    dialogVisible.value = true;
    isEdit.value = false;
}
function resetForm() {
    for (const k in __formOld__) {
        form[k] = __formOld__[k];
    }
}
function closeDlg() {
    dialogVisible.value = false;
    resetForm();
}
function getParams() {
    const params = { ...form };
    if (!isEdit.value) {
        delete params.id;
    }
    return params;
}
function handleSubmit() {
    formRef.value.validate((valid) => {
        if (!valid) return;
        formLoading.value = true;
        let promise;
        const params = getParams();
        if (isEdit.value) {
            promise = update(params);
        } else {
            promise = save(params);
        }
        promise
            .then((res) => {
                if (!isEdit.value) {
                    ElMessageBox.alert(
                        `${t('tips.success')}${t('form.username')}:${res.data.name},${t('form.password')}:${res.data.password}`,
                        t('tips.title'),
                        {
                            confirmButtonText: t('action.confirm'),
                        }
                    )
                } else {
                    ElMessage({
                        message: t('tips.success'),
                        type: 'success',
                        showClose: true,
                    });
                }
                closeDlg();
                if (isEdit.value) {
                    tableRef.value.refresh();
                } else {
                    tableRef.value.reload();
                }
            })
            .finally(() => {
                formLoading.value = false;
            });
    });
}
function handleResetPassword() {
    setPsw({ ...form }).then(res => {
        ElMessageBox.alert(
            `${t('tips.success')}${t('form.username')}:${res.data.name},${t('form.password')}:${res.data.password}`,
            t('tips.title'),
            {
                confirmButtonText: t('action.confirm'),
            }
        )
    });
}
</script>