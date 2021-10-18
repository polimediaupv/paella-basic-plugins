import { Events, bindEvent, ButtonPlugin } from 'paella-core';

import fullscreenIcon from '../icons/fullscreen.svg';
import windowedIcon from '../icons/windowed.svg';

export default class PauseButtonPlugin extends ButtonPlugin {
	getAriaLabel() {
        return "Toggle fullscreen";
    }

    getDescription() {
        return this.getAriaLabel();
    }

	async getDictionaries() {
		return {
			es: {
				"Toggle fullscreen": "Cambiar modo de pantalla completa"
			}
		}
	}

	async isEnabled() {
		const enabled = await super.isEnabled()
		return enabled && this.player.isFullScreenSupported()
	}
	
	async load() {
		this.icon = fullscreenIcon;
		bindEvent(this.player, Events.FULLSCREEN_CHANGED, (data) => {
			if (data.status) {
				this.icon = windowedIcon;
			}
			else {
				this.icon = fullscreenIcon;
			}
		})
	}
	
	async action() {
		if (this.player.isFullscreen) {
			await this.player.exitFullscreen();
		}
		else {
			await this.player.enterFullscreen();
		}
	}
}