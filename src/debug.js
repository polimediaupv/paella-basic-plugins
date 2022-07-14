import { Paella } from 'paella-core';
import getBasicPluginsContext, { basicPluginsDict } from './index';

import windowedIcon from "./altIcons/windowedIcon.svg";
import fullscreenIcon from "./altIcons/fullscreenIcon.svg";
import volumeHighIcon from "./altIcons/volumeHighIcon.svg";
import volumeMidIcon from "./altIcons/volumeMidIcon.svg";
import volumeLowIcon from "./altIcons/volumeLowIcon.svg";
import volumeMuteIcon from "./altIcons/volumeMuteIcon.svg";
import screenIcon from "./altIcons/screenIcon.svg";
import layoutIcon from "./altIcons/layoutIcon.svg";
import backwardIcon from "./altIcons/backwardIcon.svg";
import forwardIcon from "./altIcons/forwardIcon.svg";
import keyboardIcon from "./altIcons/keyboardIcon.svg";
import downloadIcon from "./altIcons/downloadIcon.svg";
import captionsIcon from "./altIcons/captionsIcon.svg";
import findCaptionsIcon from './altIcons/findCaptionsIcon.svg';

const initParams = {
	customPluginContext: [
		getBasicPluginsContext()
	]
};

let paella = new Paella('player-container', initParams);

paella.loadManifest()
	.then(() => {
		// Customized icon tests
		// fullscreen 
		paella.addCustomPluginIcon("es.upv.paella.fullscreenButton","fullscreenIcon",fullscreenIcon);
		paella.addCustomPluginIcon("es.upv.paella.fullscreenButton","windowedIcon",windowedIcon);

		// volume
		paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeHighIcon",volumeHighIcon);
		paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeMidIcon",volumeMidIcon);
		paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeLowIcon",volumeLowIcon);
		paella.addCustomPluginIcon("es.upv.paella.volumeButtonPlugin","volumeMuteIcon",volumeMuteIcon);

		// quality selector
		paella.addCustomPluginIcon("es.upv.paella.qualitySelector","screenIcon",screenIcon);

		// playback rate
		paella.addCustomPluginIcon("es.upv.paella.playbackRateButton","screenIcon",screenIcon);

		// layout selector
		paella.addCustomPluginIcon("es.upv.paella.layoutSelector","layoutIcon",layoutIcon);

		// backward 30 segonds
		paella.addCustomPluginIcon("es.upv.paella.backwardButtonPlugin","backwardIcon",backwardIcon);

		// forward 30 segonds
		paella.addCustomPluginIcon("es.upv.paella.forwardButtonPlugin","forwardIcon",forwardIcon);

		// keyboard icon
		paella.addCustomPluginIcon("es.upv.paella.keyboardShortcutsHelp","keyboardIcon",keyboardIcon);

		// audio selector
		paella.addCustomPluginIcon("es.upv.paella.audioSelector","screenIcon",screenIcon);

		// download icon
		paella.addCustomPluginIcon("es.upv.paella.downloadsPlugin","downloadIcon",downloadIcon);

		// find captions icon
		paella.addCustomPluginIcon("es.upv.paella.findCaptionsPlugin","findCaptionsIcon",findCaptionsIcon);

		// captions icon
		paella.addCustomPluginIcon("es.upv.paella.captionsSelectorPlugin","captionsIcon",captionsIcon);
	})
	.catch(e => console.error(e));
