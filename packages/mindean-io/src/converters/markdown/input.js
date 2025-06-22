// import '../../libs/markmap-lib.0.15';
import { Transformer } from 'markmap-lib';
import TreeNode from '../../core/data/TreeNode';
import { readFile, isFile } from '../../utils/file-resolver';

/**
 * Build tree structure from markdown content.
 */
function build(content) {  
    // const { Transformer } = global.window.markmap;
    const transformer = new Transformer();
	const { root } = transformer.transform(content);

	function traverse(node) {  
		const treeNode = new TreeNode({
			title: node.content
		})

		if (node.children && node.children.length > 0) {  
			treeNode.children = node.children.map(childNode => traverse(childNode));  
		}  

		return treeNode;  
	}  

	return traverse(root);
}  

/**
 * Convert markdown data to tree structure.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			let data = options.source.data;

			// File object, needs to be read
			if (isFile(data)) {
				data = await readFile(data);
			}

			const rootData = build(data);
			const sourceData = { rootData };
			resolve(sourceData);
		}
		catch (e) {
			reject(e);
		}
	});
}