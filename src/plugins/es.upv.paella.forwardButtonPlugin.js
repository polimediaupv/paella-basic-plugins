import { ButtonPlugin } from 'paella-core';

import defaultForwardIcon from '../icons/forward-30-s.svg';

export default class ForwardButtonPlugin extends ButtonPlugin {
	getAriaLabel() {
        return "Forward 30 seconds";
    }

    getDescription() {
        return this.getAriaLabel();
    }

	async getDictionaries() {
		return {
			es: {
				"Forward 30 seconds": "Ir hacia adelante 30 segundos"
			}
		}
	}

	async load() {
		this.icon = this.player.getCustomPluginIcon(this.name,"forwardIcon") || defaultForwardIcon;
	}
	
	async action() {
		const currentTime = await this.player.videoContainer.currentTime();
		this.player.videoContainer.setCurrentTime(currentTime + 30);
	}
}
