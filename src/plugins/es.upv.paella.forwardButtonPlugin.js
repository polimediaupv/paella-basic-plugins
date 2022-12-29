import { ButtonPlugin } from 'paella-core';

import defaultForwardIcon from '../icons/forward-30-s.svg';

export default class ForwardButtonPlugin extends ButtonPlugin {
	getAriaLabel() {
        return this.player.translate("Forward $1 seconds",[this.config.time]);
    }

    getDescription() {
        return this.getAriaLabel();
    }

	async getDictionaries() {
		return {
			es: {
				"Forward $1 seconds": "Ir hacia adelante $1 segundos"
			}
		}
	}

	async isEnabled() {
		const enabled = await super.isEnabled();
		this.time = this.config.time || 30;
		return enabled;
	}

	async load() {
		this.icon = this.player.getCustomPluginIcon(this.name,"forwardIcon") || defaultForwardIcon;
		setTimeout(() => {
			const textIcon = this.iconElement.getElementsByClassName('time-text')[0];
			if (textIcon) {
				textIcon.innerHTML = this.time + 's';
			}
		}, 100);
	}
	
	async action() {
		const currentTime = await this.player.videoContainer.currentTime();
		this.player.videoContainer.setCurrentTime(currentTime + 30);
	}
}
