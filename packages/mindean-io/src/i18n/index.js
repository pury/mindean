import zh_CN from './zh_CN.js';
import en_US from './en_US.js';

const locale = {};
locale['zh_CN'] = zh_CN;
locale['en_US'] = en_US;

export const language = 'zh_CN';

export default function lang(code, ...args) {
    let text = locale[language][code];

    if (text === undefined) { text = zh_CN[code]; }

    if (!text) {
        return '{' + code + '}';
    }

    let length = args.length;

    for (let i = 0; i < length; i++) {
        text = text.replace('{' + i + '}', args[i]);
    }

    return text;
}
