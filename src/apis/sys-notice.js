import request from '../request';

export const listPage = (data) => {
    return request({
        url: 'sys/notice/listPage',
        method: 'get',
        data,
    });
};