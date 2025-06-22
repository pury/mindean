import { readFile, isFile } from '../../utils/file-resolver';
import * as pr from '../../utils/parsing-resolver';

/**
 * Convert XML string to JSON format.
 */
function toJSON(xmlStr) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr, 'application/xml');

    function toTreeNode(node) {
        if (node.tagName !== 'node') {
            return null;
        }

        const children = Array.from(node.children || []).map(toTreeNode).filter(child => child);

        return {
            id: node.getAttribute('ID'),
            text: node.getAttribute('TEXT') || '',
            children
        };
    }

    function convertToTree(xmlRoot) {
       if (xmlRoot.tagName === 'map') {
            return toTreeNode(xmlRoot.children[0]);
        }
        
        console.error('Unsupported element:', xmlRoot.tagName);
        return null;
    }

    const rootNode = convertToTree(xmlDoc.documentElement);
    return rootNode;
}

/**
 * Build tree structure from FreeMind data.
 */
function build(content) {  
    function traverse(node) {  
        const treeNode = pr.createTreeNode({
            title: node.title || node.text
        })

        if (node.children && node.children.length) {  
            treeNode.children = node.children.map(childNode => traverse(childNode));  
        }  

        return treeNode;  
    }  

    return traverse(content);
}  

/**
 * Convert FreeMind data to tree structure.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			let data = options.source.data;

			if (isFile(data)) {
				data = await readFile(data);
			}

			data = toJSON(data);

			if (!data) {
				return reject(pr.createError(4001));
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