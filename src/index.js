import dictionaries from './dictionaries';

export default function getBasicPluginsContext() {
    return require.context("./plugins", true, /\.js/)
}

export const basicPluginsDict = dictionaries;
