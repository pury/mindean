import TreeNode from '../../core/data/TreeNode';
import { readFile, isFile } from '../../utils/file-resolver';

/**
 * Build tree structure from JSON data.
 */
function build(content) {  
	function traverse(node) {  
		const treeNode = new TreeNode({
			title: node.title || node.name || node.txt || node.text || ''
		})

		if (node.children && node.children.length > 0) {  
			treeNode.children = node.children.map(childNode => traverse(childNode));  
		}  

		return treeNode;  
	}  

	return traverse(content);
}  

/**
 * Convert JSON data to tree structure.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			let data = options.source.data;

			// File object, needs to be read
			if (isFile(data)) {
				data = await readFile(data, false);
			}

			if (typeof data === 'string') {
				data = JSON.parse(data);
			}

			const rootData = build(data.rootData);
			const sourceData = { rootData };
			resolve(sourceData);
		}
		catch (e) {
			reject(e);
		}
	});
}