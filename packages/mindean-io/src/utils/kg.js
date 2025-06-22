/**
 * Convert graph structure to tree structure.
 */
export const convertGraphToTree = (data) => {
	const { nodes, links, config } = data;
	if (!nodes.length) return null;
	const rootId = config.rootId;
	const nodesKV = {};
	const cacheIds = [];
	let rootNode = null;

	nodes.forEach(node => {
		nodesKV[node.id] = node;

		if (node.id === rootId) {
			rootNode = node;
		}
	})

	if (!rootNode) {
		rootNode = nodes[0];
	}

	links.forEach(link => {
		const from = nodesKV[link.from];
		const to = nodesKV[link.to];
		from.children = from.children || [];
		from.children.push(to);
	})

    function traverse(node) { 
    	const newNode = { id: node.id, title: node.name || '', children: [] };	
    	cacheIds.push(node.id);

    	if (!node.children) return newNode;

    	node.children.forEach(child => {
    		if (cacheIds.includes(child.id)) return;

    		newNode.children.push(traverse(child));
    	})

    	return newNode;
    }

   return traverse(rootNode);
}

/**
 * Convert tree structure to graph structure.
 */
export const convertTreeToGraph = (node, nodes = [], links = []) => {
	const id = node.id >> 0;

	// Add current node to node list  
	nodes.push({ ...node, id, name: node.name || node.text || node.title || '' });  

	// Traverse child nodes  
	if (node.children) {  
		node.children.forEach(child => {  
		// Add current node to links list as parent node  
			const from = id;
			const to = child.id >> 0;
			const len = links.length;
			links.push({ id: len, from, to });  
			// Recursively traverse child nodes  
			convertTreeToGraph(child, nodes, links);  
		});  
	}  

	return { nodes, links };  
}

/**
 * Convert tree structure to graph structure with string IDs.
 */
export const convertTreeToGraphByStringID = (node) => {
	let index = 0;

	const task = (node, nodes = [], links = []) => {
		const id = index;

		// Add current node to node list  
		nodes.push({ id, name: node.name || node.text || node.title || '' });  

		// Traverse child nodes  
		if (node.children) {  
			node.children.forEach(child => {  
			// Add current node to links list as parent node  
				const next = ++index;
				child.id = next;
				const from = id;
				const to = child.id;
				const len = links.length;
				links.push({ id: len, from, to });  
				// Recursively traverse child nodes  
				task(child, nodes, links, next);  
			});  
		}  

		return { nodes, links };  
	}

	return task(node);
}