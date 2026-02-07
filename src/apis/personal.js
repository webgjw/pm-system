import request from "@/request";
// 用户基本信息
export const userInfo = (data) => {
    return request({
        url: 'personal/userInfo',
        method: 'get',
        data,
    });
};
// 用户菜单树
export const menuTree = (data) => {
    return request({
        url: 'personal/menuTree',
        method: 'get',
        data,
    });
};

export function changeProfile() {
    return {
        url: 'personal/changeProfile',
        type: 'post',
        response: {
            code: 200,
            msg: null,
        }
    }
}

export const changePsw = (data) => {
    return request({
        url: '/personal/changepsw',
        method: 'post',
        data,
    });
};