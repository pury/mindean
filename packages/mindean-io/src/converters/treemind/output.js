import * as pr from '../../utils/parsing-resolver';
import * as zr from '../../utils/zip-resolver';
import template from './template';

const build = (storeData) => {  
    const rootData = storeData.rootData;
    const result = {
        nodesInfo: [],
        work_name: storeData.config.title,
        watermarkDisplay: 'None',
        watermarkImage: 'None',
        mainLink: { lineWidth: 2, color: '#000229' }
    };

    function traverse(node) {  
        const treeNode = {
        	_serialId: pr.createUUID(),
        	value: node.title,
            children: [],
            style: {}
        }

        if (node.children && node.children.length) {  
            treeNode.children = node.children.map(childNode => traverse(childNode));  
        }  

        return treeNode;  
    }  

    result.nodesInfo.push(traverse(rootData));
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

            const fileList = template();
            fileList.push(contentData);
            const data = await zr.makeZip(fileList);

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