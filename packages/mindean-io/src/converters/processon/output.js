import * as pr from '../../utils/parsing-resolver';

const build = (storeData) => {  
    const rootData = storeData.rootData;
    const result = {
        diagram: { elements: {} },
        meta: {
            diagramInfo: {
                title: storeData.config.title
            },
            version: '5.0',
        }
    };

    function traverse(node, parent) {  
        const id = pr.createUUID();
        const treeNode = {
            id,
            title: node.title,
            children: []
        }

        if (parent) { 
            treeNode.parent = parent; 
        }
        else {
            // 根节点
            treeNode.theme = 'bg_caihong'; // 可选
            treeNode.structure = 'mind_free'; // 必选
        }

        if (node.children && node.children.length) {  
            treeNode.children = node.children.map(childNode => traverse(childNode, id));  
        }  

        return treeNode;  
    }  

    result.diagram.elements = traverse(rootData, null);
    return result;
}

export default (options) => {
    return new Promise(async(resolve, reject) => { 
        try {
            const storeData = options.storeData;
            const title = storeData.config.title;
            const data = build(storeData);

            storeData.downloadData = {
                title,
                blob: new Blob([JSON.stringify(data, null, 0)]),
            }

            resolve(storeData);
        }
        catch (e) {
            reject(pr.createError(4001, e));
        }
    });
}