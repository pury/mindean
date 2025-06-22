import * as zr from '../../utils/zip-resolver';
import * as pr from '../../utils/parsing-resolver';
const xmltojson = require('xmltojson');

/**
 * Build tree structure from MindManager data.
 */
const build = (content) => {
	function traverse(node) {  
		const treeNode = pr.createTreeNode({ 
			title: node.Text ? node.Text[0]._attr.PlainText._value : ''
		})

		if (node.SubTopics && node.SubTopics.length) {  
			// Temporarily take only the first topic
			treeNode.children = node.SubTopics[0].Topic.map(childNode => traverse(childNode));  
		}  

		return treeNode;  
	}  

	return traverse(content);
}

/**
 * Convert MindManager data to tree structure.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			let data = options.source.data;
			const zipData = await zr.readZip(data);
			const contentData = await zr.readZipFile(zipData.files['Document.xml'], 'text');
			const jsonData = xmltojson.parseString(contentData);
			const rootData = build(jsonData.Map[0].OneTopic[0].Topic[0]);
			const sourceData = { rootData };
			resolve(sourceData);
		}
		catch (e) {
			reject(pr.createError(4001, e));
		}
	});
}