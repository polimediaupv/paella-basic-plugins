import { PluginModule } from "paella-core";
import packageData from "../../package.json";

export default class BasicPluginsModule extends PluginModule {
    get moduleName() {
        return "paella-basic-plugins";
    }

    get moduleVersion() {
        return packageData.version;
    }
}