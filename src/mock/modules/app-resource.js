// 分页查询
export function listPage() {
    return {
        url: 'app/resource/listPage',
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
        url: 'app/resource/(save|update)',
        method: 'post',
        response: {
            code: 200,
        }
    }
}

export function listTreeParents() {
    return {
        url: 'app/resource/listParents',
        method: 'get',
        response: () => {
            function filterTree(data) {
                const newTree = data.filter(v => v.type !== 2);
                newTree.forEach(v => v.children && (v.children = filterTree(v.children)));
                return newTree;
            }
            return {
                code: 200,
                data: filterTree(JSON.parse(JSON.stringify(treeData)))
            };
        },
    };
}