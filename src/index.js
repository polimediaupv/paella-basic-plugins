
export default function getBasicPluginsContext() {
    return require.context("./plugins", true, /\.js/)
}
