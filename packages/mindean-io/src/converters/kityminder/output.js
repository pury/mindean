import { generate } from '../../utils/uuid';
import TYPES from '../../config/types';
import * as pr from '../../utils/parsing-resolver';

const build = (storeData) => {  
	const rootData = storeData.rootData;
	const result = {
		root: {},
		template: 'default',
		version: '1.4.43'
	};

	function traverse(node) {  
		const treeNode = {
			data: {
				id: generate(),
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
        	const subtype = options.target.subtype || TYPES.KITYMINDER;

        	if (subtype === TYPES.KITYMINDER) {
				const title = storeData.config.title;
				const data = build(storeData);

				storeData.downloadData = {
					title,
					blob: new Blob([JSON.stringify(data, null, 0)]),
				}

				return resolve(storeData);
        	}

        	import('../freemind/output').then(e => {
        		e.default(options).then(result => {
        			resolve(result);
        		}).catch(error => {
        			reject(error);
        		})
        	})
		}
		catch (e) {
			reject(pr.createError(4001, e));
		}
	});
}