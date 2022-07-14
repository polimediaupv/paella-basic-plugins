import { Paella } from 'paella-core';
import getBasicPluginsContext, { basicPluginsDict } from './index';

import windowedIcon from "./altIcons/windowedIcon.svg";
import fullscreenIcon from "./altIcons/fullscreenIcon.svg";

const initParams = {
	customPluginContext: [
		getBasicPluginsContext()
	]
};

let paella = new Paella('player-container', initParams);

paella.loadManifest()
	.then(() => {
		paella.addCustomPluginIcon("es.upv.paella.fullscreenButton","fullscreenIcon",fullscreenIcon);
		paella.addCustomPluginIcon("es.upv.paella.fullscreenButton","windowedIcon",windowedIcon);
	})
	.catch(e => console.error(e));
