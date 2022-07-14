import { ButtonPlugin } from 'paella-core';

import defaultBackwardIcon from '../icons/back-30-s.svg';

export default class BackwardButtonPlugin extends ButtonPlugin {
	getAriaLabel() {
        return "Backward 30 seconds";
    }

    getDescription() {
        return this.getAriaLabel();
    }

	async getDictionaries() {
		return {
			es: {
				"Backward 30 seconds": "Volver hacia atrás 30 segundos"
			}
		}
	}
	
	async load() {
		this.icon = this.player.getCustomPluginIcon(this.name,"backwardIcon") || defaultBackwardIcon;	
	}
	
	async action() {
		const currentTime = await this.player.videoContainer.currentTime();
		this.player.videoContainer.setCurrentTime(currentTime - 30);
	}
}
