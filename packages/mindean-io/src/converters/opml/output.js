/**
 * Build OPML content from tree structure.
 */
function build(content, title) {  
    let opml = `<?xml version="1.0" encoding="UTF-8"?>\n<opml version="2.0">\n<head>\n  <title>${title}</title>\n</head>\n<body>\n`;  

    function buildOutline(node) {  
        const text = node.title;
        let outline = `<outline text="${text}">\n`;  

        if (node.children && node.children.length > 0) {  
            node.children.forEach(child => {  
                outline += buildOutline(child);  
            });  
        }  

        outline += '</outline>\n';  
        return outline;  
    }  

    opml += buildOutline(content);  
    opml += '</body>\n</opml>';  
    return opml;  
}  

/**
 * Convert tree structure to OPML format.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			const storeData = options.storeData;
            const title = storeData.config.title;
			const data = build(storeData.rootData, title);

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