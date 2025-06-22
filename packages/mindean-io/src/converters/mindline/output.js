import * as pr from '../../utils/parsing-resolver';

const build = (storeData) => {  
	const rootData = storeData.rootData;
	const result = {
		ID: pr.createUUID(),
		root: {},
		lineKeepThin: true,
		objectClass: 'NSDictionary'
	};

	function traverse(node) {  
		const treeNode = {
			ID: pr.createUUID(),
			text: node.title,
			children: { objectClass: 'NSArray' },
			objectClass: 'MindNode'
		}

		if (node.children && node.children.length) {  
			const children = node.children.map(childNode => traverse(childNode));
			let index = 0;

			children.forEach(childNode => {
				treeNode.children[index++] = childNode;
			})
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