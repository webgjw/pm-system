import request from '../request';

export const listPage = (data) => {
    return request({
        url: 'app/resource/listPage',
        method: 'get',
        data,
    });
};

// 新增
export const save = (data) => {
    return request({
        url: 'app/resource/save',
        method: 'post',
        data,
    });
};

// 编辑
export const update = (data) => {
    const { id } = data;
    delete data.id;
    return request({
        url: `app/resource/update/${id}`,
        method: 'post',
        data,
    });
};

export const listTreeParents = (data) => {
    return request({
        url: 'app/resource/listParents',
        method: 'get',
        data
    });
};