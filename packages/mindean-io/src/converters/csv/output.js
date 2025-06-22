/**
 * Build CSV content from tree structure.
 */
function build(content) {  
    let result = 'source,target\n';  

    function buildItem(node) {  
        const title = node.title;

        if (node.children && node.children.length > 0) {  
            node.children.forEach(child => {  
                result += `${title},${child.title}\n`;
                buildItem(child);  
            });  
        }  
    }  

    buildItem(content); 
    return result;  
}  

/**
 * Convert tree structure to CSV format.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			const storeData = options.storeData;
			const data = build(storeData.rootData);

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