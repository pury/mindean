import * as zr from '../../utils/zip-resolver';
import * as pr from '../../utils/parsing-resolver';

/**
 * Build tree structure from XMind data.
 */
const build = (content) => {
	function traverse(node) {  
		const treeNode = pr.createTreeNode({
			title: node.title
		});

		if (node.children && node.children.attached && node.children.attached.length) {  
			treeNode.children = node.children.attached.map(childNode => traverse(childNode));  
		}  

		return treeNode;  
	}  

	return traverse(content);
}

/**
 * Convert XMind data to tree structure.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			let data = options.source.data;
			const zipData = await zr.readZip(data);
			const contentData = await zr.readZipFile(zipData.files['content.json'])
			const rootTopic = contentData[0].rootTopic;
			const rootData = build(rootTopic);
			const sourceData = { rootData };
			resolve(sourceData);
		}
		catch (e) {
			reject(pr.createError(4001, e));
		}
	});
}