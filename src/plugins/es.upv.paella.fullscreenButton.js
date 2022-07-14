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
		const fsIcon = this.player.getCustomPluginIcon(this.name,"fullscreenIcon") || fullscreenIcon;
		const wIcon = this.player.getCustomPluginIcon(this.name,"windowedIcon") || fullscreenIcon;
		this.icon = fsIcon
		bindEvent(this.player, Events.FULLSCREEN_CHANGED, (data) => {
			if (data.status) {
				this.icon = wIcon;
			}
			else {
				this.icon = fsIcon;
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