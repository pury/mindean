
const getManifestJson = () => {
	return {
		'content.json': {}
	};
}

export default () => {
	return [
		{ title: 'manifest.json', content: JSON.stringify(getManifestJson()) },
	]
}