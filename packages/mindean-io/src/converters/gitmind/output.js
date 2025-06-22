import * as pr from '../../utils/parsing-resolver';
import * as zr from '../../utils/zip-resolver';

const build = (storeData) => {  
    const rootData = storeData.rootData;
    const result = {
        root: {},
        id: pr.createUUID(),
        version: '2.1.3',
        relLines: [],
        style: {},
        watermark: {},
        outlineThemeNo: 1,
        floatRoots: []
    };

    function traverse(node) {  
        const id = pr.createUUID();
        const treeNode = {
            data: {
                id,
                text: node.title,
                html: node.title,
                expanded: true
            },
            style: {},
            children: []
        }

        if (node.children && node.children.length) {  
            treeNode.children = node.children.map(childNode => traverse(childNode));  
        }  

        return treeNode;  
    }  

    result.root = traverse(rootData);
    return result;
}

export default (options) => {
    return new Promise(async(resolve, reject) => { 
        try {
            const storeData = options.storeData;
            const title = storeData.config.title;
            const contentData = { 
                title: 'content.json', 
                content: JSON.stringify(build(storeData))
            };

            const data = await zr.makeZip([contentData]);

            storeData.downloadData = {
                title,
                blob: new Blob([data]),
            }

            resolve(storeData);
        }
        catch (e) {
            reject(pr.createError(4001, e));
        }
    });
}