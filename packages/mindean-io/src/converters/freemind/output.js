/**
 * Build FreeMind XML content from tree structure.
 */
function build(content) {  
    let freemind = '<?xml version="1.0" encoding="UTF-8"?>\n<map version="0.9.0">\n';  

    function buildNode(node, depth = 0) {  
        const name = node.title;
        freemind += '<node ID="' + node.id + '" TEXT="' + name + '">';  
        
        if (node.children && node.children.length) {  
            node.children.forEach(child => {  
                buildNode(child, depth + 1);  
            });  
        }  

        freemind += '</node>\n';  
    }  

    buildNode(content, 0);  

    freemind += '</map>';  
    return freemind;  
}  

/**
 * Convert tree structure to FreeMind format.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			const storeData = options.storeData;
            const title = storeData.config.title;
			const data = build(storeData.rootData);

			storeData.downloadData = {
				title,
				blob: new Blob([data]),
			}

			resolve(storeData);
		}
		catch (e) {
			reject(e);
		}
	});
}