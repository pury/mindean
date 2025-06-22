import { saveAs } from 'file-saver';

/**
 * Save file to user's local device.
 */
export const save = (e) => {
	saveAs(e.blob, e.title);
}
