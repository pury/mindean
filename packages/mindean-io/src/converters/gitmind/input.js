import * as zr from '../../utils/zip-resolver';
import * as pr from '../../utils/parsing-resolver';

/**
 * Build tree structure from GitMind data.
 */
const build = (content) => {
	function traverse(node) {  
		const treeNode = pr.createTreeNode({
			title: node.data.text || node.data.html
		});

		if (node.children && node.children.length) {  
			treeNode.children = node.children.map(childNode => traverse(childNode));  
		}  

		return treeNode;  
	}  

	return traverse(content);
}

/**
 * Convert GitMind data to tree structure.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			let data = options.source.data;
			const zipData = await zr.readZip(data);
			const content = await zr.readZipFile(zipData.files['content.json'])
			const rootData = build(content.root);
			const sourceData = { rootData };
			resolve(sourceData);
		}
		catch (e) {
			reject(pr.createError(4001, e));
		}
	});
}