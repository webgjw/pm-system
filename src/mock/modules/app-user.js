import { roles, users } from '../data';
// 分页查询
export function listPage() {
    return {
        url: 'app/user/listPage',
        method: 'get',
        response: (opts) => {
            const { pageNum, pageSize, name } = opts.data;
            let set = users.map(v => {
                const o = { ...v };
                if (v.id <= 4) {
                    o.password = o.name;
                    o.roleName = roles.find(item => item.name === o.roleId).label;
                    o.ip = '@ip';
                    o.visitTime = '@date @time';
                }
                return o;
            });
            if (name) {
                set = set.filter(v => v.name === name);
            }
            const totalSize = set.length;
            const totalPages = Math.ceil(totalSize / pageSize);
            let lastIndex = pageNum * pageSize;
            if (lastIndex > totalSize) {
                lastIndex = totalSize;
            }
            let resData = [];
            if (pageNum >= 1 && pageNum <= totalPages) {
                resData = set.slice((pageNum - 1) * pageSize, lastIndex);
            }
            return {
                code: 200,
                msg: null,
                data: {
                    pageNum,
                    pageSize,
                    totalSize,
                    content: resData
                }
            };
        }
    };
}

// 新增
export function save() {
    return {
        url: 'app/user/save',
        method: 'post',
        response: (opts) => {
            return {
                code: 200,
                data: {
                    name: opts.data.name,
                    password: '@word(8,16)'
                }
            }
        }
    }
}
// 编辑
export function update() {
    return {
        url: 'app/user/update',
        method: 'post',
        response: {
            code: 200
        }
    }
}
// 删除
export function remove() {
    return {
        url: 'app/user/remove',
        method: 'post',
        response: {
            code: 200
        }
    }
}
// 设置密码
export function setPsw() {
    return {
        url: 'app/user/password',
        method: 'get',
        response: (opts) => {
            return {
                code: 200,
                data: {
                    name: opts.data.name,
                    password: '@word(8,16)'
                }
            }
        }
    }
}