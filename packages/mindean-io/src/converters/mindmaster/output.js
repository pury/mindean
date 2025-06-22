import TYPES from '../../config/types';

export default (options) => {
    return new Promise((resolve, reject) => { 
        const storeData = options.storeData;
        const subtype = options.target.subtype || TYPES.FREEMIND;
        const converter = subtype === TYPES.FREEMIND ? 'freemind/output' : 'opml/output';

        import('../' + converter).then(e => {
            e.default(options).then(result => {
                resolve(result);
            }).catch(error => {
                reject(error)
            })
        })
    });
}