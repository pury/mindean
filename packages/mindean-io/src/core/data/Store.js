import lang from '../../i18n/';

/**
 * Data store class for managing configuration and root data.
 */
export default class Store {
    _config;
    _rootData;

    /**
     * Initialize store with default configuration.
     */
    constructor() {
        this._config = { title: lang(1002) };
        this._rootData = {};
    }

    /**
     * Update configuration by merging with existing config.
     */
    updateConfig(value) {
        this._config = { ...this._config, ...value }
    }

    /**
     * Set configuration completely replacing existing config.
     */
    setConfig(value) {
        this._config = value;
    }

    /**
     * Set the root data structure.
     */
    setRootData(value) {
        this._rootData = value;
    }

    /**
     * Get all data including config and root data.
     */
    getData() {
        return {
            config: this._config,
            rootData: this._rootData
        }
    }
}