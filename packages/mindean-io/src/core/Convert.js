import Store from './data/Store';
import config from '../config/config';
import * as fr from '../utils/file-resolver';

/**
 * Main conversion class for handling mind map format conversions.
 */
export default class Convert {
	store;
	mindmapConfig;
    // theme;
    // plugin;
    // converter;

    // static registerConverter(cvtClass) {
    //     if (cvtClass.cvtName) {
    //         Plugin.register(cvtClass);
    //     } else {
    //         throw new Error('Plugin needs to set static property cvtName');
    //     }
    // }

	/**
	 * Initialize the Convert instance.
	 */
	constructor() {
		this.mindmapConfig = JSON.parse(JSON.stringify(config.mindmap));
	}

	// init() {
	// 	this.__initConverter();
	// }

	// __initConverter() {
 //        this.converter = new Plugin(this);
 //        this.converter.initPlugins(pluginConfig);
	// }

	/**
	 * Execute conversion from source format to target format.
	 */
	process(options) {
		return new Promise(async(resolve, reject) => { 
			const { source, target } = options;
			const targetConfigData = this.mindmapConfig.filter(item => item.type === target.type)[0];

			if (!targetConfigData) return reject(null);

			try {
				const sourceConverter = await import('../converters/' + source.type + '/input');
				const sourceData = await sourceConverter.default(options);

				options.sourceData = sourceData;

				this.store = new Store();
				this.store.setRootData(sourceData.rootData);

				// Handle the file types supported by the application product.
				// Most product-level applications support multiple types of storage files.
				if (fr.isFile(source.data)) {
					const subtype = target.subtype;
					let suffix = targetConfigData.suffix.split(',')[0];

					if (subtype) {
						const subConfigData = this.mindmapConfig.filter(item => item.type === subtype)[0];

						if (subConfigData) {
							suffix = subConfigData.suffix.split(',')[0];
						}
					}

					const title = fr.changeFileSuffix(source.data.name, suffix);
					this.store.updateConfig({ title });
				}

				options.storeData = this.store.getData();

				const targetConverter = await import('../converters/' + target.type + '/output');
				const targetData = await targetConverter.default(options);
				resolve(targetData);
			}
			catch (e) {
				reject(e);
			}
		});
	}

	/**
	 * Get the input format by file.
	 * @param {File | string} fileData - The file data.
	 * @returns {object} - The input format.
	 */
	getInputFormatByFile(fileData) {
		if (!fileData) return null;

		const suffix = fr.getFileSuffix(fileData);
		return this.mindmapConfig.filter(item => item.suffix.includes(suffix) && item.input === 'yes')[0];
	}

	/**
	 * Get the input formats.
	 * @returns {array} - The input formats.
	 */
	getInputFormats() {
		return this.mindmapConfig.filter(item => item.input === 'yes');
	}

	/**
	 * Get the output formats.
	 * @returns {array} - The output formats.
	 */
	getOutputFormats() {
		return this.mindmapConfig.filter(item => item.output === 'yes');
	}
}