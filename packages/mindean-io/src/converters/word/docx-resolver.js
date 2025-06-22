import { 
	Paragraph, TextRun, HeadingLevel, AlignmentType, 
	Table, TableRow, TableCell, WidthType, SectionType
} from 'docx';

const cellStyle = {  
	padding: {  
		right: 500,
		left: 500,
		unit: 'twip'
	}  
}; 

/**
 * Create document heading with title and heading level.
 */
export const makeHead = (title, heading) => {
	return new Paragraph({
	    text: title,
	    heading,
	    alignment: AlignmentType.CENTER,
	})
}

/**
 * Create simple paragraph with text.
 */
export const makeParagraph = (text) => {
	return new Paragraph({
	    text: text,
	})
}

/**
 * Create document block with title and content.
 */
export const makeBlock = (title, content) => {
	return {
        properties: {
        	type: SectionType.CONTINUOUS,
        },
		children: [
        	new Paragraph({
			    text: title,
			    heading: HeadingLevel.HEADING_3,
			    alignment: AlignmentType.LEFT,
			    spacing: {  
					line: 288, 
					before: 0,  
					after: 0  
				}
			})
		].concat(content)
	}
}

/**
 * Create document section with children.
 */
export const makeSection = (children = []) => {
	return {
        properties: {
        	type: SectionType.CONTINUOUS,
        },
		children: [].concat(children)
	}
}

/**
 * Create table from data array with optional column sizes.
 */
export const makeTable = (data, sizes = []) => {
	const rows = [];

	data.forEach(row => {
		const cells = [];
		let i = 0;

		row.forEach(cell => {
			cells.push(new TableCell({
				children: [new Paragraph(cell + '')],
				width: {
					size: sizes[i++] || (100 / row.length),
					type: WidthType.PERCENTAGE
				},
				style: cellStyle
			}))
		})

		rows.push(new TableRow({
			children: cells,
			width: {  
				size: 100,  
				type: WidthType.PERCENTAGE  
			}  
		}))
	})

	return new Table({
		rows,
		width: {  
			size: 100,  
			type: WidthType.PERCENTAGE  
		},
	})
}

/**
 * Create secondary bullet list from list data.
 */
export const makeSecondaryList = (listData) => {
	let list = [];

	listData.forEach(item => {
		const children = item.children.map(_ => new Paragraph({  
			bullet: {  
				text: '•',  
				level: 1,  
			},  
				children: [new TextRun(_)],  
			})
		);

		list.push(new Paragraph({  
			bullet: {  
				level: 0,
				text: ''
			},  
				children: [new TextRun(item.name)]
			})
  		)

  		list = list.concat(children);
	})

	return list;
}

/**
 * Create hierarchical tree list from node structure.
 */
export const makeTreeList = (node, level = 0) => {  
	const items = [];  
	const indent = '    '.repeat(level <= 1 ? 0 : level - 1);
	let heading = null;

	const option = {  
		// bullet: { level, text: '' },
		children: [new TextRun(indent + node.title)],  
		spacing: { line: 200 }
	}

	if (level === 0) { heading = HeadingLevel.TITLE; }
	else if (level === 1) { heading = HeadingLevel.HEADING_1; }

	if (heading) { option.heading = heading; }
	items.push(new Paragraph(option));  

	if (node.children && node.children.length > 0) {  
		node.children.forEach(child => {  
			items.push(...makeTreeList(child, level + 1));  
		});  
	}  

	return items;
}
