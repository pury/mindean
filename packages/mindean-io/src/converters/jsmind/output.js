import { generate } from '../../utils/uuid';

const build = (storeData) => {  
	const rootData = storeData.rootData;
	const result = {
		data: {},
		format: 'node_tree',
		meta: {
			author: '',
			name: storeData.config.title,
			version: '0.1'
		}
	};

	function traverse(node) {  
		const treeNode = {
			id: generate(),
			expanded: true,
			topic: node.title,
			children: []
		}

		if (node.children && node.children.length) {  
			treeNode.children = node.children.map(childNode => traverse(childNode));  
		}  

		return treeNode;  
	}  

	result.data = traverse(rootData);
	return result;
}

export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			const storeData = options.storeData;
			const title = storeData.config.title;
			const data = build(storeData);

			storeData.downloadData = {
				title,
				blob: new Blob([JSON.stringify(data, null, 0)]),
			}

			resolve(storeData);
		}
		catch (e) {
			reject(e);
		}
	});
}