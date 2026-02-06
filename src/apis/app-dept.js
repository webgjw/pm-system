import request from '../request';
// 查询机构树
export const listTree = () => {
    return request({
        url: 'app/dept/listTree',
        method: 'get',
    });
};

// 新增
export const save = (data) => {
    return request({
        url: 'app/dept/save',
        method: 'post',
        data,
    });
};

// 编辑
export const update = (data) => {
    const { id } = data;
    delete data.id;
    return request({
        url: `app/dept/update/${id}`,
        method: 'post',
        data,
    });
};

// 删除
export const remove = (data) => {
    const { id } = data;
    delete data.id;
    return request({
        url: `app/dept/delete/${id}`,
        method: 'post',
        data,
    });
};