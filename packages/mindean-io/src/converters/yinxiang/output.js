import * as pr from '../../utils/parsing-resolver';
import template from './template';

function build(storeData) {
    const rootData = storeData.rootData;
    let index = 1;

    function traverse(node, parent) {  
        const id = (index++).toString(); // 需要数字型字符串索引
        const treeNode = {
            id,
            name: node.title,
            html: `&lt;p style='margin: 0;'&gt;${node.title}&lt;/p&gt;`,
            children: [],
            realH: 48,
            realW: 158
        }

        if (parent) {
            treeNode.parent = parent;
            treeNode.isFolded = false;
        }
        else {
            treeNode.pathType = 'default';
            treeNode.treeTheme = 'light';
            treeNode.treeDirection = 'both';
            treeNode.translateX = 0;
            treeNode.translateY = 0;
        }

        if (node.children && node.children.length) {  
            treeNode.children = node.children.map(childNode => traverse(childNode, id));  
        }  
        else {
            delete treeNode.children;
        }

        return treeNode;  
    }  

    return template().replace('{data}', JSON.stringify(traverse(rootData)));
}  

export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			const storeData = options.storeData;
            const title = storeData.config.title;
			const data = build(storeData);

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