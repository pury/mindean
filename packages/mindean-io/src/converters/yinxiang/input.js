import { readFile, isFile } from '../../utils/file-resolver';
import * as pr from '../../utils/parsing-resolver';
const xmltojson = require('xmltojson');

/**
 * Build tree structure from Yinxiang data.
 */
function build(content) {  
	function traverse(node) {  
		const treeNode = pr.createTreeNode({
			title: node.name
		})

		if (node.children && node.children.length > 0) {  
			treeNode.children = node.children.map(childNode => traverse(childNode));  
		}  

		return treeNode;  
	}  

	return traverse(content);
}  

/**
 * Convert Yinxiang data to tree structure.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			let data = options.source.data;

			if (isFile(data)) {
				data = await readFile(data);
			}

			const jsonData = xmltojson.parseString(data);
			console.log('jsonData', jsonData)
			const content = JSON.parse(jsonData['en-note'][0].center[0]._text);
			const rootData = build(content);
			const sourceData = { rootData };
			resolve(sourceData);
		}
		catch (e) {
            reject(pr.createError(4001, e));
		}
	});
}