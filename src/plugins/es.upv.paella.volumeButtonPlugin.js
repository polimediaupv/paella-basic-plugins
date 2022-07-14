
import{ ButtonPlugin, createElementWithHtmlText, Events, bindEvent } from 'paella-core';

import defaultVolumeHighIcon from '../icons/volume-high.svg';
import defaultVolumeMidIcon from '../icons/volume-mid.svg';
import defaultVolumeLowIcon from '../icons/volume-low.svg';
import defaultVolumeMuteIcon from '../icons/volume-mute.svg';

import "../css/slider.css";

function buildSlider() {
    this.sliderContainer.innerHTML = "";
    const slider = createElementWithHtmlText(`
        <div class="volume-slider">
            <div class="volume-slider-button"></div>
        </div>`, this.sliderContainer);
    let mouseDown = false;
    const sliderButton = slider.getElementsByClassName('volume-slider-button')[0];
    sliderButton.style.left = `${ this._prevVolume * 100 }%`;
    this._sliderButton = sliderButton;

    const setVolume = async (offsetX) => {
        const offset = 10;
        const { offsetWidth } = this.sliderContainer;
        let newVolume = offsetX * 100 / offsetWidth;
        if (newVolume < offset) {
            newVolume = 0;
        }
        if (newVolume > 100 - offset) {
            newVolume = 100;
        }
        newVolume /= 100;
        await this.player.videoContainer.setVolume(newVolume);
    }

    this.sliderContainer.addEventListener("mousedown", async (evt) => {
        mouseDown = true;
        await setVolume(evt.offsetX);
    });

    this.sliderContainer.addEventListener("mousemove", async (evt) => {
        if (mouseDown) {
            await setVolume(evt.offsetX);                    
        }
    });

    this.sliderContainer.addEventListener("mouseleave", () => {
        mouseDown = false;
    });

    this.sliderContainer.addEventListener("mouseup", () => {
        mouseDown = false;
    });

    this.sliderContainer.style.display = "none";

    bindEvent(this.player, Events.VOLUME_CHANGED, ({volume}) => {
        this.updateIcon(volume)
    });
}


export default class VolumePlugin extends ButtonPlugin {
    getAriaLabel() {
        return "Change volume";
    }

    getDescription() {
        return this.getAriaLabel();
    }

	async getDictionaries() {
		return {
			es: {
				"Change volume": "Cambiar el volumen del audio"
			}
		}
	}

    get className() {
        return "volume-button";
    }

    async updateIcon(vol) {
        const volumeHighIcon = this.player.getCustomPluginIcon(this.name,"volumeHighIcon") || defaultVolumeHighIcon;
        const volumeMidIcon = this.player.getCustomPluginIcon(this.name,"volumeMidIcon") || defaultVolumeMidIcon;
        const volumeLowIcon = this.player.getCustomPluginIcon(this.name,"volumeLowIcon") || defaultVolumeLowIcon;
        const volumeMuteIcon = this.player.getCustomPluginIcon(this.name,"volumeMuteIcon") || defaultVolumeMuteIcon;
        switch (true) {
        case vol===0:
            this.icon = volumeMuteIcon;
            break;
        case vol>0 && vol<=0.3:
            this.icon = volumeLowIcon;
            break;
        case vol>0.3 && vol<=0.6:
            this.icon = volumeMidIcon;
            break;
        case vol>0.6:
            this.icon = volumeHighIcon;
            break;
        default:
            this.icon = volumeHighIcon;
        }

        if (this._sliderButton) {
            this._sliderButton.style.left = `${ vol * 100 }%`;
        }
    }

    get sliderContainer() {
        if (this.config.side === "left") {
            return this.rightArea;
        }
        else {
            return this.leftArea;
        }
    }
    
    async load() {
        this._prevVolume = await this.player.videoContainer.volume();
        this.updateIcon(this._prevVolume);

        buildSlider.apply(this);
    }

    async mouseOver(target) {
        if (target === this.container) {
            this.sliderContainer.style.display = "inline-block";
        }
    }

    async mouseOut(target) {
        if (target === this.container) {
            this.sliderContainer.style.display = "none";
        }
    }

    async action() {
        const currentVolume = await this.player.videoContainer.volume();
        let newVolume = 0;
        if (currentVolume === 0 && this._prevVolume === 0) {
            newVolume = 1;
        }
        else if (currentVolume === 0 && this._prevVolume > 0) {
            newVolume = this._prevVolume;
        }
        else {
            newVolume = 0;
        }
        await this.player.videoContainer.setVolume(newVolume)
        this._prevVolume = currentVolume;
    }
}
