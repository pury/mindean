import { Transformer } from 'markmap-lib';
import TreeNode from '../../core/data/TreeNode';
import { readFile, isFile } from '../../utils/file-resolver';

/**
 * Decode node content.
 */
function decodeNode(node) {
    if (!node) return;

    if (node.content && typeof node.content === 'string') {
        node.content = node.content.replace(/&#x([0-9a-fA-F]+);/g,
            (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    }

    if (node.children && Array.isArray(node.children)) {
        for (const child of node.children) {
            decodeNode(child);
        }
    }

    if (node.table && Array.isArray(node.table.children)) {
        for (const row of node.table.children) {
            decodeNode(row);
        }
    }
}
  
/**
 * Build tree structure from markdown content.
 */
function build(content) {  
    const transformer = new Transformer();
	const { root } = transformer.transform(content);
	decodeNode(root);

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