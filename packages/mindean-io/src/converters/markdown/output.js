/**
 * Build markdown content from tree structure.
 */
function build(content, maxDepth = 5) {  
    let markdown = '';  

    function buildItem(node, depth = 1) {  
        const headingLevel = Math.min(depth, 6);  
        let heading = '#'.repeat(headingLevel);  
        const title = node.title;

        if (depth <= maxDepth) {  
            markdown += `\n${heading} ${title}\n\n`;  
        } else {  
            markdown += '  '.repeat(depth - 1 - maxDepth) + '- ' + title + '\n';  
        }  

        if (node.children && node.children.length > 0) {  
            node.children.forEach(child => {  
                buildItem(child, depth + 1);  
            });  
        }  
    }  

    buildItem(content); 
    return markdown;  
}  

/**
 * Convert tree structure to markdown format.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			const storeData = options.storeData;
			const data = build(storeData.rootData, 3);

			storeData.downloadData = {
				title: storeData.config.title,
				blob: new Blob([data]),
			}

			resolve(storeData);
		}
		catch (e) {
			reject(e);
		}
	});
}