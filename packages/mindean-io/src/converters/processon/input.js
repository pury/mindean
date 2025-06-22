import { readFile, isFile } from '../../utils/file-resolver';
import * as pr from '../../utils/parsing-resolver';

/**
 * Build tree structure from ProcessOn data.
 */
function build(content) {  
    function traverse(node) {  
        const newNode = pr.createTreeNode({
            title: node.title
        });

        if (node.children && node.children.length) {  
            newNode.children = node.children.map(childNode => traverse(childNode));  
        }  

        if (node.leftChildren && node.leftChildren.length) {  
            newNode.children = newNode.children || [];
            newNode.children = newNode.children.concat(node.leftChildren.map(childNode => traverse(childNode)));  
        }  

        return newNode;  
    }  

   return traverse(content);
}  

/**
 * Convert ProcessOn data to tree structure.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			let data = options.source.data;

			if (isFile(data)) {
				data = await readFile(data);
			}

            data = JSON.parse(data);

			const rootData = build(data.diagram.elements);
			const sourceData = { rootData };
			resolve(sourceData);
		}
		catch (e) {
			reject(pr.createError(4001, e));
		}
	});
}