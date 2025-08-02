/**
 * Check if a variable is a File object type.
 */
export const isFile = obj => {  
	return obj instanceof File;  
}  

/**
 * Get file extension - basic file type detection.
 * @param {File | string} fileData - The file data.
 * @param {boolean} lowerCase - Whether to convert to lowercase.
 * @returns {string} - The file suffix.
 */
export const getFileSuffix = (fileData, lowerCase = true) => {
    const fileName = isFile(fileData) ? fileData.name : fileData;
    const index = fileName.lastIndexOf('.');
    const suffix = '.' + fileName.substring(index + 1);
    return lowerCase ? suffix.toLowerCase() : suffix;
}

/**
 * Read file content as text or JSON.
 * 
 * @param fildData Local uploaded source file object
 * @param plaintext Read result as plain text or JSON object
 */
export const readFile = (fileData, plaintext = true) => {
	return new Promise((resolve, reject) => { 
		var reader = new FileReader();
		reader.readAsText(fileData); 

		reader.onload = function(e) {
			let data = null;

			if (!plaintext) {
				try {
					data = JSON.parse(e.target.result);
				}
				catch (e) {
					data = null;
				}

				return data ? resolve(data) : reject(null);
			}

			resolve(e.target.result);
		}

		reader.onerror = function(e) {
			reject(e);
		}
	});
}

/**
 * Change file extension.
 */
export const changeFileSuffix = (fileName, suffix) => {  
    if (fileName.includes('.')) {  
        return fileName.replace(/\.[^.]+$/, suffix);  
    }
        
    return fileName + suffix;  
} 
