const ExcelJS = require('exceljs');

const style = { 
	'font': { 
		'size': 8, 
		'color': { 'argb': 'FFFFFFFF' },
	},
};

const fill = {
  	type: 'pattern',
  	pattern: 'solid',
	fgColor: { argb: 'FF00b4ec' }, 
	bgColor: { argb: 'FF00b4ec' }, 
}

const border = {
	right: {
		style: 'thin', color: { argb: 'FF9b9b9b' }
	}
}

/**
 * Format Excel worksheet with styles and borders.
 */
export const format = (worksheet, data) => {
	const { header } = data;
	const count = header.length;

	for (let i = 1; i <= count; i++) {
		const item = header[i - 1];

		const cellName = String.fromCharCode(65 + i - 1) + 1;
		worksheet.getCell(cellName).style = style;
		worksheet.getCell(cellName).fill = fill;
		worksheet.getCell(cellName).border = border;

		worksheet.getCell(cellName).note = {
			texts: [
				{ 'text': item.key },
			]
		};
	}
}

/**
 * Create Excel workbook from data.
 */
export const make = async(data) => {
	const workbook = new ExcelJS.Workbook();
	workbook.creator = 'Mindean';

	const worksheet = workbook.addWorksheet(data.name || 'Mindean');
	worksheet.columns = data.header;
	worksheet.addRows(data.body);

	format(worksheet, data);

	const buffer = await workbook.xlsx.writeBuffer();
	return buffer;
}