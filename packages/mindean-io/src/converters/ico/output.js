/**
 * Convert tree structure to ICO format.
 */
export default (options) => {
	return new Promise(async(resolve, reject) => { 
		try {
			const storeData = options.storeData;

			storeData.downloadData = {
				title: storeData.config.title,
				blob: new Blob([JSON.stringify(storeData, null, 0)]),
			}

			resolve(storeData);
		}
		catch (e) {
			reject(e);
		}
	});
}