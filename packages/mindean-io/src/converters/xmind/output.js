import * as pr from '../../utils/parsing-resolver';
import * as zr from '../../utils/zip-resolver';
import template from './template';

/**
 * Build XMind content from store data.
 */
const build = (storeData) => {  
    const rootData = storeData.rootData;
    const result = {
        rootTopic: {},
        title: storeData.config.title,
        theme: {},
        topicOverlapping: 'overlap',
        id: pr.createUUID(),
        class: 'sheet'
    };

    function traverse(node) {  
        const id = pr.createUUID();
        const treeNode = {
            id,
            title: node.title,
            children: { attached: [] }
        }

        if (node.children && node.children.length) {  
            treeNode.children.attached = node.children.map(childNode => traverse(childNode));  
        }  

        return treeNode;  
    }  

    result.rootTopic = traverse(rootData);
    return [result];
}

/**
 * Convert tree structure to XMind format.
 */
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