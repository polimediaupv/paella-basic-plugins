import { Paella } from 'paella-core';
import getBasicPluginsContext, { basicPluginsDict } from './index';

const initParams = {
	customPluginContext: [
		getBasicPluginsContext()
	]
};

let paella = new Paella('player-container', initParams);

paella.loadManifest()
	.then(() => console.log("done"))
	.catch(e => console.error(e));
