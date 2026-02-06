import request from '../request';
// 分页查询
export const listPage = (data) => {
    return request({
        url: 'app/role/listPage',
        method: 'get',
        data,
    });
};

// 新增
export const save = (data) => {
    return request({
        url: 'app/role/save',
        method: 'post',
        data,
    });
};

// 编辑
export const update = (data) => {
    const { id } = data;
    delete data.id;
    return request({
        url: `app/role/update/${id}`,
        method: 'post',
        data,
    });
};

// 删除
export const remove = (data) => {
    const { id } = data;
    delete data.id;
    return request({
        url: `app/role/delete/${id}`,
        method: 'post',
        data,
    });
};

export const listSimple = () => {
    return request({
        url: 'app/role/listSimple',
        method: 'get',
    });
};

// 绑定资源
export const bindResource = (data) => {
    return request({
        url: 'app/role/bindResource',
        method: 'post',
        data,
    });
};