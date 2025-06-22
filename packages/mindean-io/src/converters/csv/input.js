import csvtojson from 'csvtojson';
import { readFile, isFile } from '../../utils/file-resolver';
import * as pr from '../../utils/parsing-resolver';

/**
 * Build tree structure from CSV data.
 */
function build(content) {  
    const nodeMap = {};  
    const visited = new Set(); 
    const rootName = content[0].source;  
    visited.add(rootName);
  
    content.forEach(item => {  
        if (!nodeMap[item.source]) {  
            nodeMap[item.source] = pr.createTreeNode({  
                title: item.source 
            });  
        }  
        if (!nodeMap[item.target]) {  
            nodeMap[item.target] = pr.createTreeNode({  
                title: item.target 
            });  
        }  
    });  
  
    content.forEach(item => {  
        const sourceNode = nodeMap[item.source];  
        const targetNode = nodeMap[item.target];  
  
        if (visited.has(targetNode.title)) {  
            console.warn(`Detected cycle: Attempting to add ${targetNode.title} as a child of ${sourceNode.title}, but it is already in the tree.`);  
        } else {  
            visited.add(targetNode.title);  
            sourceNode.children.push(targetNode);  
        }  
    });  

    return nodeMap[rootName];  
}  

/**
 * Convert CSV data to tree structure.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			let data = options.source.data;

			if (isFile(data)) {
				data = await readFile(data);
			}

			data = await csvtojson().fromString(data);

			if (!data.length) {
				return reject(pr.createError(4006));
			}

			const rootData = build(data);
			const sourceData = { rootData };
			resolve(sourceData);
		}
		catch (e) {
			reject(pr.createError(4001, e));
		}
	});
}