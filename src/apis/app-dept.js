import request from '../request';
// 查询机构树
export const listTree = () => {
    return request({
        url: 'app/dept/listTree',
        method: 'get',
    });
};