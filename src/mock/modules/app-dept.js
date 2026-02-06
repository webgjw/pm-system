export function listTree() {
    // 查询机构树
    let findTreeData = {
        code: 200,
        msg: null,
        data: [
            {
                id: 1,
                createdBy: 'admin',
                createdTime: '@date @time',
                lastUpdateBy: 'admin',
                lastUpdateTime: '@date @time',
                name: '大具集团',
                parentId: null,
                parentName: null,
                level: 0,
                children: [
                    {
                        id: 5,
                        createdBy: 'admin',
                        createdTime: '@date @time',
                        lastUpdateBy: 'admin',
                        lastUpdateTime: '@date @time',
                        name: '北京分公司',
                        parentId: 1,
                        children: [
                            {
                                id: 7,
                                createdBy: 'admin',
                                createdTime: '@date @time',
                                lastUpdateBy: 'admin',
                                lastUpdateTime: '@date @time',
                                name: '技术部',
                                parentId: 5,
                                children: [],
                                parentName: '技术部',
                                level: 2,
                            },
                            {
                                id: 10,
                                createdBy: 'admin',
                                createdTime: '@date @time',
                                lastUpdateBy: 'admin',
                                lastUpdateTime: '@date @time',
                                name: '市场部',
                                parentId: 5,
                                children: [],
                                parentName: '市场部',
                                level: 2,
                            }
                        ]
                    }
                ]
            }
        ]
    };
    return {
        url: 'app/dept/listTree',
        type: 'get',
        response: findTreeData,
    };
}

export function operations() {
    return {
        url: 'app/dept/(save|update|delete)',
        method: 'post',
        response: {
            code: 200,
        }
    }
}