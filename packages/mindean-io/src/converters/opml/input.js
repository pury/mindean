import TreeNode from '../../core/data/TreeNode';
import { readFile, isFile } from '../../utils/file-resolver';

/**
 * Convert OPML string to JSON object.	
 * @param {string} opmlString OPML format string
 * @returns {Promise<Object>} Return parsed JSON object
 */
function opmlToJSON(opmlString) {
    return new Promise((resolve, reject) => {
        try {
            // Use DOMParser to parse XML.
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(opmlString, 'text/xml');

            // Check for parsing errors.
            const parserError = xmlDoc.getElementsByTagName('parsererror');
            if (parserError.length > 0) {
                throw new Error('Invalid OPML format');
            }

            // Get root node.
            const outlineElements = xmlDoc.getElementsByTagName('outline');
            if (outlineElements.length === 0) {
                return resolve({});
            }

            // Recursively process outline nodes.
            const processOutline = (outline) => {
                const result = {
                    text: outline.getAttribute('text') || '',
                    type: outline.getAttribute('type') || null,
                    xmlUrl: outline.getAttribute('xmlUrl') || null,
                    htmlUrl: outline.getAttribute('htmlUrl') || null,
                    children: []
                };

                // Process child nodes.
                const children = outline.children;
                for (let i = 0; i < children.length; i++) {
                    if (children[i].tagName.toLowerCase() === 'outline') {
                        result.children.push(processOutline(children[i]));
                    }
                }

                return result;
            };

            // Build result object.
            const jsonResult = {
                //   head: {
                title: xmlDoc.querySelector('head > title') ?.textContent || '',
                dateCreated: xmlDoc.querySelector('head > dateCreated') ?.textContent || '',
                dateModified: xmlDoc.querySelector('head > dateModified') ?.textContent || '',
                //   },
                children: []
            };

            // Process top-level outline nodes.
            for (let i = 0; i < outlineElements.length; i++) {
                const outline = outlineElements[i];
                if (outline.parentNode.tagName.toLowerCase() === 'body') {
                    jsonResult.children.push(processOutline(outline));
                }
            }

            resolve(jsonResult);
        } catch(error) {
            reject(error);
        }
    });
}

/**
 * Convert OPML data to JSON format.
 */
const toJSON = (data) => {
	return new Promise((resolve, reject) => { 
		opmlToJSON(data).then(e => {
			if (e && e.children && e.children.length) {
				resolve(e.children[0]);
			}
			else {
				reject(null);
			}
		}).catch(e => {
			reject(e);
		})
	})
}

/**
 * Build tree structure from OPML data.
 */
const build = (content) => {  
	function traverse(node) {  
		const treeNode = new TreeNode({
			title: node.title || node.text
		})

		if (node.children && node.children.length) {  
			treeNode.children = node.children.map(childNode => traverse(childNode));  
		}  

		return treeNode;  
	}  

	return traverse(content);
}  

/**
 * Convert OPML data to tree structure.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			let data = options.source.data;

			if (isFile(data)) {
				data = await readFile(data);
			}

			data = await toJSON(data);
			const rootData = build(data);
			const sourceData = { rootData };
			resolve(sourceData);
		}
		catch (e) {
			reject(e);
		}
	});
}