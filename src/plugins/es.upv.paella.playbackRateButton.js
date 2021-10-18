import { MenuButtonPlugin } from 'paella-core';

import screenIcon from '../icons/screen.svg';
import '../css/playbackRate.css';

export default class PlaybackRateButton extends MenuButtonPlugin {
    getAriaLabel() {
        return "Switch the playback speed";
    }

    getDescription() {
        return this.getAriaLabel();
    }

	async getDictionaries() {
		return {
			es: {
				"Switch the playback speed": "Cambiar la velocidad de reproducción"
			}
		}
	}

    async load() {
        this.icon = screenIcon;
        this.title = "1x";
        this._rates = this.config.rates || [0.5, 0.75, 1, 1.25, 1.5, 2];
    }

    async getMenu() {
        const playbackRate = await this.player.videoContainer.playbackRate();
        const getItem = (rate) => {
            return {
                id: rate,
                title: `${ rate }x`,
                selected: rate == playbackRate
            }            
        }
        return this._rates.map(r => getItem(r));
    }

    get titleSize() { return "small"; }

    async itemSelected(itemData) {
        await this.player.videoContainer.setPlaybackRate(itemData.id);
        this.title = itemData.title;
    }

    get buttonType() {
        return "radio";
    }
}