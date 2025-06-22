import JSZip from 'jszip';

/**
 * Read file content as JSON from array buffer.
 */
const readAsJSON = (arrayBuffer, encoding = 'UTF-8') => {
	return readFile(arrayBuffer, encoding, false);
}

/**
 * Read file content as text from array buffer.
 */
const readAsText = (arrayBuffer, encoding = 'UTF-8') => {
	return readFile(arrayBuffer, encoding, true);
}

/**
 * Read file content from array buffer with specified encoding.
 */
const readFile = (arrayBuffer, encoding = 'UTF-8', plaintext = true) => {
	return new Promise((resolve, reject) => { 
		var reader = new FileReader();
		var blob = new Blob([arrayBuffer]);
		reader.onload = function(evt) {
			let data = null;
			
			if (!plaintext) {
				try {
					data = JSON.parse(evt.target.result);
				}
				catch (e) {
					data = null;
				}

				return data ? resolve(data) : reject(null);
			}

			resolve(evt.target.result);
		};  
		reader.onerror = function(evt) {
			reject(null);
		};  
		reader.readAsText(blob, encoding);
	})
}

/**
 * Read the specified file in the compressed package.
 * @param {string} type  'json' | 'text'
 */
export const readZipFile = (file, type = 'json') => {
	return new Promise((resolve, reject) => { 
		if (!file) return reject(null);

		file.async('blob').then(blob => {
			if (type === 'json') {
				readAsJSON(blob).then(e => resolve(e)).catch(e => reject(e));
			}
			else {
				readAsText(blob).then(e => resolve(e)).catch(e => reject(e));
			}
		}).catch(e => {
			reject(e);
		})
	})
}

/**
 * Read zip file and return zip handle.
 * 
 * @return zip  [ zip.files ] 
 */
export const readZip = (fileData) => {
	return new Promise((resolve, reject) => { 
		JSZip.loadAsync(fileData).then(function(zip) {
			resolve(zip);
		}).catch(e => {
			reject(e);
		})
	})
}

/**
 * Create zip file from file list.
 */
export const makeZip = (fileList) => {
	return new Promise(function(resolve, reject) { 
		const zip = new JSZip;

        fileList.forEach(item => {
	        zip.file(item.title, item.content);
        })

        zip.generateAsync({ type: 'blob' }).then( e => {
        	resolve(e);
        }).catch(e => {
	        reject(e);
        })
	});
}  