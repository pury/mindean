import * as pr from '../../utils/parsing-resolver';

const build = (storeData) => {  
	const rootData = storeData.rootData;
	const result = {
		root: {},
		themeBgColor: '',
		version: '1.5.2'
	};

	function traverse(node) {  
		const treeNode = {
			data: {
				id: pr.createUUID(),
				text: node.title
			},
			children: []
		}

		if (node.children && node.children.length) {  
			treeNode.children = node.children.map(childNode => traverse(childNode));  
		}  

		return treeNode;  
	}  

	result.root = traverse(rootData);
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