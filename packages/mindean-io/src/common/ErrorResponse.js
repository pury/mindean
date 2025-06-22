import lang from '../i18n/';

/**  
 * Standardized API error response format.  
 * Automatically maps error codes to localized messages.  
 * @property {string} code - Machine-readable error code  
 * @property {string} message - Localized human-readable message  
 * @property {string} error - Original error details (optional)  
 */  
export default class ErrorResponse {  
    constructor(code, error) {  
        this.code = code;  
        this.message = lang(code);  
        this.error = error || '';
    }  
  
    /**  
     * Returns formatted error summary  
     * @return {string} - Readable error description  
     */  
    toString() {  
        return `Error Code: ${this.code}, Message: ${this.message}`;  
    }  
}  
