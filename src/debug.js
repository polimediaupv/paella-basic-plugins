import { Paella } from 'paella-core';
import getBasicPluginsContext, { basicPluginsDict } from './index';

const initParams = {
	customPluginContext: [
		getBasicPluginsContext()
	],

	loadDictionaries: (player) => {
		player.setLanguage("es");
		for (const lang in basicPluginsDict) {
			const dict = basicPluginsDict[lang];
			player.addDictionary(lang, dict);
		}
	}
};

let paella = new Paella('player-container', initParams);

paella.loadManifest()
	.then(() => console.log("done"))
	.catch(e => console.error(e));
