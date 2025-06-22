const ExcelJS = require('exceljs');
import * as er from './excel-resolver';
import * as kg from '../../utils/kg';

/**
 * Build Excel workbook from store data.
 */
const build = async(storeData) => {
	const { nodes, links } = kg.convertTreeToGraphByStringID(storeData.rootData);

	const nodesKV = {};

	nodes.forEach(node => {
		nodesKV[node.id] = node;
	})

	links.forEach(link => {
		link.source = nodesKV[link.from].name || '';
		link.target = nodesKV[link.to].name || '';
	})

	const workbook = new ExcelJS.Workbook();
	workbook.creator = 'Mindean';
	const worksheetNodes = workbook.addWorksheet('nodes');
	worksheetNodes.columns = [
		{ header: 'ID', key: 'id', width: 10 },
		{ header: 'Name', key: 'name', width: 20 },
	];
	worksheetNodes.addRows(nodes);
	er.format(worksheetNodes, { header: worksheetNodes.columns });

	const worksheetLinks = workbook.addWorksheet('links');
	worksheetLinks.columns = [
		{ header: 'ID', key: 'id', width: 10 },
		{ header: 'Source Node', key: 'source', width: 20 },
		{ header: 'Target Node', key: 'target', width: 20 },
	];

	worksheetLinks.addRows(links);
	er.format(worksheetLinks, { header: worksheetLinks.columns });

	const buffer = await workbook.xlsx.writeBuffer();
	return buffer;
}

/**
 * Convert tree structure to Excel format.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			const storeData = options.storeData;
			const buffer = await build(storeData);

			storeData.downloadData = {
				title: storeData.config.title,
				blob: new Blob([buffer]),
			}

			resolve(storeData);
		}
		catch (e) {
			reject(e);
		}
	});
}