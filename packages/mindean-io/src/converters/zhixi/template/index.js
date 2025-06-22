
const getManifestJson = () => {
	return {
		'content.json': {}, 
		'metadata.json': {}
	};
}

const getMetadataJson = () => {
	return { 'type': 'mindmap', 'template': 'default' };
}

export default () => {
	return [
		{ title: 'manifest.json', content: JSON.stringify(getManifestJson()) },
		{ title: 'metadata.json', content: JSON.stringify(getMetadataJson()) }
	]
}