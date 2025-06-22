import { Document, Packer } from 'docx';
import * as dr from './docx-resolver';

const build = (storeData) => {
	const title = storeData.config.title;
	let sections = [];

	sections.push(dr.makeBlock('', dr.makeTreeList(storeData.rootData)));

	return sections;
}

export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			const storeData = options.storeData;
			const title = storeData.config.title;

			const doc = new Document({
			    creator: 'Mindean',
			    description: '',
			    title,
			    sections: build(storeData)
			});

			const blob = await Packer.toBlob(doc);
			storeData.downloadData = { title, blob };
			resolve(storeData);
		}
		catch (e) {
			reject(e);
		}
	});
}