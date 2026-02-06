// 分页查询
export function listPage() {
    return {
        url: 'app/role/listPage',
        method: 'get',
        response: (opts) => {
            const { pageNum, pageSize } = opts.data;
            const totalSize = 4;
            const content = 
                pageNum * pageSize < totalSize
                    ? 'content|${pageSize}'
                    : 'content|${totalSize % pageSize}';
            return {
                code: 200,
                msg: null,
                data: {
                    pageNum,
                    pageSize,
                    totalSize,
                    [content]: [
                        {
                            id: '@increment',
                            'createdBy|1': ['admin', 'admin2'],
                            title: '@ctitle(5, 20)',
                            createdTime: '@date @time',
                            content: '@cparagraph(1, 2)',
                            'publishTime|1': ['', '@date @time'],
                        }
                    ]
                }
            }
        }
    };
}

export function operations() {
    return {
        url: 'app/role/(save|update|delete|bindResource)',
        method: 'post',
        response: {
            code: 200,
        }
    }
}

export function listSimple() {
    return {
        url: 'app/role/listSimple',
        method: 'get',
        response: {
            code: 200,
            msg: null,
            data: [
                {
                    id: 1,
                    name: 'admin',
                },
                {
                    id: 2,
                    name: 'dev',
                },
                {
                    id: 3,
                    name: 'test',
                },
                {
                    id: 4,
                    name: 'mng',
                }
            ]
        }
    }
}